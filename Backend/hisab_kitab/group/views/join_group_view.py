from rest_framework import generics

from ..models import Group
from ..serializers import GroupSerializer


class JoinGroup(generics.CreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    def perform_create(self, serializer):
        serializer.save()
        instance = self.get_object()
        instance.member.create(user=self.request.user, role="ADMIN")
