from rest_framework import generics

from ..serializers import UserSerializer
from .search_user_view import User


class GetUser(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
