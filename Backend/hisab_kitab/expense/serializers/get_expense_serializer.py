from rest_framework import serializers

from ..models import Expense


class GetExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ["id", "category", "split_type", "amount", "created_at", "updated_at"]
