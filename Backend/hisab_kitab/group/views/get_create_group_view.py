from activity.services.create_activity import create_activity
from django.db import transaction
from django.db.models import Q
from rest_framework import generics, status
from rest_framework.response import Response

from ..models import Group
from ..serializers import GroupSerializer


class GetCreateGroup(generics.ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    @transaction.atomic
    def perform_create(self, serializer):
        group = serializer.save()
        create_activity(group,self.request.user,
        "GROUP CREATE",f"You created the group {group.group_name}")
        group.member.create(user=self.request.user, role="ADMIN")

    def get_queryset(self):
        query = self.request.query_params.get("q")
        queryset = Group.objects.filter(member__user=self.request.user.id).order_by(
            "-created_at"
        )
        if query:
            return (
                queryset.filter(
                    Q(group_name__icontains=query) | Q(description__icontains=query)
                )
                .filter(member__user=self.request.user.id)
                .order_by("-created_at")
            )
        return queryset

    def list(self, request, *args, **kwargs):
        group = self.get_queryset()

        serializer = self.get_serializer(group, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
