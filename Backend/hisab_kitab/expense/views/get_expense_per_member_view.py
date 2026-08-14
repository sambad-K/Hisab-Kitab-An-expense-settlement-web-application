from rest_framework import generics

from ..models import Expense, ExpensePerMember
from ..serializers import ExpensePerMemberSerializer


class GetExpensePerMember(generics.ListAPIView):
    queryset = ExpensePerMember.objects.all()
    serializer_class = ExpensePerMemberSerializer

    def get_queryset(self):
        group_id = self.kwargs["pk"]
        expense = Expense.objects.filter(group_id=group_id).first()
        if expense is None:
            return ExpensePerMember.objects.none()
        return ExpensePerMember.objects.filter(expense_id=expense.id)
