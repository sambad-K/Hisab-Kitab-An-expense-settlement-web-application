from rest_framework import generics

from ..models import Settlement
from ..serializers import GetSettlementSerializer


class GetSettlement(generics.ListAPIView):
    queryset = Settlement.objects.all()
    serializer_class = GetSettlementSerializer

    def get_queryset(self):
        expense_id = self.kwargs["pk"]
        return Settlement.objects.filter(expense_id=expense_id)
