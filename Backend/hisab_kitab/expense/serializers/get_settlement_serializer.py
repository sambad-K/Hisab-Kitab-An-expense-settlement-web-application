from rest_framework import serializers

from group.serializers import GroupMemberSerializer

from ..models import Settlement


class GetSettlementSerializer(serializers.ModelSerializer):
    from_member = GroupMemberSerializer(read_only=True)
    to_member = GroupMemberSerializer(read_only=True)

    class Meta:
        model = Settlement
        fields = "__all__"
