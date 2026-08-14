from activity.services.create_activity import create_activity
from rest_framework import generics, status
from rest_framework.response import Response

from ..models import Settlement
from ..serializers import SettlementSerializer


class ToggleSettlementStatus(generics.UpdateAPIView):
    queryset = Settlement.objects.all()
    serializer_class = SettlementSerializer

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        expense=instance.expense
        group=expense.group
        instance.status = not instance.status
        from_member=instance.from_member
        to_member=instance.to_member
        if (instance.status):
            create_activity(group,self.request.user,"PAYMENT",
            f"Your settlement completed with {from_member.user.username}")
            create_activity(group,from_member.user,"PAYMENT",
            f"You paid your settlement with {to_member.user.username}")
            

        instance.save()
        return Response(status=status.HTTP_200_OK)
