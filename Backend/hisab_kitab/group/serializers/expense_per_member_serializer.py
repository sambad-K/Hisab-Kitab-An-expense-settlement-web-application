from rest_framework import serializers

from ..models import ExpensePerMember


class ExpensePerMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpensePerMember
        fields = "__all__"
