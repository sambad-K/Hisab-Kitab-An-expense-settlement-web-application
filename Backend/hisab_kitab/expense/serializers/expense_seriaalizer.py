from rest_framework import serializers

from ..models import Expense


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ["id", "category", "split_type", "amount", "created_at", "updated_at"]
