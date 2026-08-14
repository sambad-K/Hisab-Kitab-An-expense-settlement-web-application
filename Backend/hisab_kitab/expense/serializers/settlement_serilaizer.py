from rest_framework import serializers

from ..models import Settlement


class SettlementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Settlement
        fields = "__all__"

    def validate(self, attrs):
        from_member = attrs["from_member"]
        to_member = attrs["to_member"]
        if from_member == to_member:
            raise serializers.ValidationError("Sender and receiver must be not same")
        return attrs
