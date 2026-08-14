from rest_framework import serializers

from ..models.user_model import User


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "picture",
            "email",
        ]
