from decimal import Decimal

from rest_framework import generics, status
from rest_framework.response import Response

from ..models import ExpensePerMember
from ..serializers import ExpensePerMemberSerializer


class UpdateExpensePerMember(generics.UpdateAPIView):
    queryset = ExpensePerMember.objects.all()
    serializer_class = ExpensePerMemberSerializer

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        total = instance.expense.amount

        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        share_amount = serializer.validated_data.get(
            "share_amount", instance.share_amount
        )

        if "percent" in serializer.validated_data:
            print("Percent")
            print(request.data)
            share_amount = (serializer.validated_data["percent"] / Decimal(100)) * total
            serializer.save(share_amount=share_amount)
            return Response(status=status.HTTP_200_OK)
        else:
            serializer.save()
        return Response(status=status.HTTP_200_OK)
