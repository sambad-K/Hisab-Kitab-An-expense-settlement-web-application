from rest_framework import generics

from ..models import Expense
from ..serializers import GetExpenseSerializer


class GetExpense(generics.ListAPIView):
    queryset = Expense.objects.all()
    serializer_class = GetExpenseSerializer

    def get_queryset(self):
        group_id = self.kwargs["pk"]
        return Expense.objects.filter(group=group_id)
