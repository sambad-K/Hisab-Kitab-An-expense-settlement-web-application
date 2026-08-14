from group.models import Group
from group.serializers import GroupSerializer
from rest_framework import generics
from rest_framework.response import Response

from ..models import Expense


class GetGroupByExpense(generics.RetrieveAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    def retrieve(self, request, *args, **kwargs):
        eid = kwargs["id"]
        expense = Expense.objects.get(id=eid)
        group = expense.group
        serializer = self.get_serializer(group)
        return Response(serializer.data)
