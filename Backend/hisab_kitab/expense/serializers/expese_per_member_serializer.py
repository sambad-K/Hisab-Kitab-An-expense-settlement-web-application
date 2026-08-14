from rest_framework import serializers

from group.serializers import GroupMemberSerializer

from ..models import ExpensePerMember
from ..serializers import ExpenseSerializer


class ExpensePerMemberSerializer(serializers.ModelSerializer):
    group_member = GroupMemberSerializer(read_only=True)
    expense = ExpenseSerializer(read_only=True)

    class Meta:
        model = ExpensePerMember
        fields = "__all__"
