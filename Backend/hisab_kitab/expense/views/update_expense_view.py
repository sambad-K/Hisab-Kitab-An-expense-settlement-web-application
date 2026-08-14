from activity.services.create_activity import create_activity
from django.db import transaction
from group.services.update_expense_per_member import update_expense_per_member
from rest_framework import generics, status
from rest_framework.response import Response

from ..models import Expense, Settlement
from ..serializers import ExpenseSerializer


class UpdateExpense(generics.UpdateAPIView):
    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all()

    @transaction.atomic
    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        if Settlement.objects.filter(expense=instance, status=False).exists():
            return Response(
                {"error": "Settlements are not cleared"},
                status=status.HTTP_400_BAD_REQUEST,
            )  
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        expense = serializer.save()
        create_activity(
            expense.group,
            self.request.user,
            "EXPENSE UPDATE",
            f"You updated the expense of group {expense.group.group_name} ",
        )
        members = expense.group.member.all()
        for i in members:
            if i.user != self.request.user:
                create_activity(
                    expense.group,
                    i.user,
                    "EXPENSE UPDATE",
                    f"{self.request.user.username} has updated expense for group {expense.group.group_name}",
                )
        update_expense_per_member(expense.group)
        return Response(status=status.HTTP_200_OK)
