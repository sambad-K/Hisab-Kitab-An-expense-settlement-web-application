from decimal import ROUND_DOWN, Decimal

from activity.services.create_activity import create_activity
from django.db import transaction
from group.models import Group
from rest_framework import generics, status
from rest_framework.response import Response

from ..models import Expense, ExpensePerMember
from ..serializers import ExpenseSerializer


class CreateExpense(generics.CreateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        group_id = self.kwargs["pk"]
        serializer = self.get_serializer(data=request.data)
        if Expense.objects.filter(group__id=group_id).exists():
            return Response({"error":"Expense already exist in the group"},status=status.HTTP_400_BAD_REQUEST)
        group = Group.objects.get(id=group_id)
        serializer.is_valid(raise_exception=True)
        expense = serializer.save(group_id=group.id)

        members = list(group.member.all())
        if expense.split_type == "EQUAL":
            count = len(members)
            if(count==0):
                return
            base_share = (expense.amount / count).quantize(
                Decimal("0.01"), rounding=ROUND_DOWN
            )
            remainder = expense.amount - (base_share * count)
            for i in members:
                share = base_share
                if remainder > Decimal("0.00"):
                    share += Decimal("0.01")
                    remainder -= Decimal("0.01")
                ExpensePerMember.objects.create(
                    expense=expense,
                    group_member=i,
                    paid_amount=Decimal("0.00"),
                    share_amount=share,
                )
        else:
            for i in members:
                ExpensePerMember.objects.create(
                    expense=expense,
                    group_member=i,
                    paid_amount=Decimal("0.00"),
                    share_amount=Decimal("0.00"),
                )
        create_activity(
            group,
            self.request.user,
            "EXPENSE CREATE",
            f"You created the expense for group {group.group_name}",
        )

        members = group.member.all()
        for i in members:
            if self.request.user != i.user:
                create_activity(
                    group,
                    i.user,
                    "EXPENSE CREATE",
                    f"{request.user.username} created the expense for group {group.group_name}",                 )

        return Response(status=status.HTTP_201_CREATED)
