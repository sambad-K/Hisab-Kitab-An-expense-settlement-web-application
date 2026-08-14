from rest_framework import generics

from ..serializers import UserSerializer
from .get_user_view import User


class UpdateUser(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
