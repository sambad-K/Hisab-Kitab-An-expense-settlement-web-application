from rest_framework import serializers

from ..models import User


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    username = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    picture = serializers.ImageField()
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [  # noqa: RUF012
            "email",
            "username",
            "first_name",
            "last_name",
            "picture",
            "password1",
            "password2",
        ]

    def validate(self, data):
        if data["password1"] != data["password2"]:
            raise serializers.ValidationError("Two passwords do not match")
        return data

    def create(self, validated_data):
        validated_data.pop("password2")
        user = User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password1"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            picture=validated_data["picture"],
            username=validated_data["username"],
        )
        return user
