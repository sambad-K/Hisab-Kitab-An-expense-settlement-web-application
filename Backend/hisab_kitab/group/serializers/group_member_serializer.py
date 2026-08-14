from rest_framework import serializers

from ..models import GroupMember
from .group_serializer import GroupSerializer
from .user_serializer import UserSerializer


class GroupMemberSerializer(serializers.ModelSerializer):
    group = GroupSerializer(read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = GroupMember
        fields = "__all__"
