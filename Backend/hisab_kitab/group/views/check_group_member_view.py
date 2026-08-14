from rest_framework import generics, status
from rest_framework.response import Response

from ..models import GroupMember
from ..serializers import GroupMemberSerializer


class CheckGroupMember(generics.ListAPIView):
    queryset = GroupMember.objects.all()
    serializer_class = GroupMemberSerializer

    def get_queryset(self):
        return GroupMember.objects.filter(role="ADMIN", user=self.request.user)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
