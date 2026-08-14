from rest_framework import generics, status
from rest_framework.response import Response

from ..models import Group, GroupMember
from ..serializers import GroupMemberSerializer


class GetGroupMember(generics.ListAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupMemberSerializer

    def get_queryset(self):
        group_id = self.kwargs["pk"]
        return GroupMember.objects.filter(group__id=group_id)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
