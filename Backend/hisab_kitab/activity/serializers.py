from group.serializers import GroupSerializer
from rest_framework import serializers
from user.serializers import UserSerializer

from .models import Activity


class ActivitySerializer(serializers.ModelSerializer):
    group=GroupSerializer(read_only=True)
    user=UserSerializer(read_only=True)
    class Meta:
        model=Activity
        fields="__all__"