
from decimal import Decimal

from activity.services.create_activity import create_activity
from django.db.transaction import atomic
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Expense, Settlement
from ..services.make_settlement import make_settlement


class CreateSettlement(APIView):
    @atomic
    def post(self, request, pk):
        expense = Expense.objects.get(id=pk)
        members = expense.perexpense.all()
        total_paid = Decimal("0.00")
        total_share = Decimal("0.00")
        for i in members:
            total_paid += i.paid_amount

        for i in members:
            total_share += i.share_amount
        total_paid=total_paid.quantize(Decimal("0.01"))
        total_share=total_share.quantize(Decimal("0.01"))
        expense_amount=expense.amount.quantize(Decimal("0.01"))
        if total_share > expense_amount:
            return Response(
                {"error": "Total share cannot be greater than total amount"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if total_paid > expense_amount:
            return Response(
                {"error": "Total paid amount cannot be greater than expense amount "},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if total_paid < expense_amount:
            return Response(
                {"error": "Total paid amount is less than the expense amount "},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if total_share < expense_amount:
            return Response(
                {"error": "Total share amount is less than the expense amount "},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if Settlement.objects.filter(expense=expense, status=False).exists():
            return Response(
                {"error": "Settlement not created, please clear previous settlements"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        elif Settlement.objects.filter(expense=expense).exists():
            Settlement.objects.filter(expense=expense).delete()
        settlement_result = make_settlement(expense)
        group=expense.group
        members=group.member.all()
        created = []
        for i in settlement_result:
            settlement_data = Settlement.objects.create(
                from_member=i["from_member"].group_member,
                to_member=i["to_member"].group_member,
                amount=i["amount"],
                expense=expense,
            )
            created.append(settlement_data.id)
        if len(created) <= 0:
            return Response(
                {"error": "Settlement for single user cannot be made"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        create_activity(group,self.request.user,"SETTLEMENT CREATE",
                        f"""You created a settlement in a group {group.group_name}""")
       
        for i in members:
            if (i.user != self.request.user):
                create_activity(group,i.user,"SETTLEMENT CREATE",
            f"""{self.request.user.username} created new a settlement in a group {group.group_name}""") 


        return Response(status=status.HTTP_201_CREATED)
