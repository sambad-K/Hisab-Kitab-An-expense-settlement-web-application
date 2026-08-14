from django.db.models import Q
from rest_framework import generics, status
from rest_framework.response import Response

from ..serializers import UserSerializer
from ..serializers.user_serializer import User


class SearchUser(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        query = self.request.query_params.get("q", "")
        return User.objects.filter(
            Q(username__icontains=query)
            | Q(first_name__icontains=query)
            | Q(last_name__icontains=query)
            | Q(email__icontains=query)
        ).exclude(Q(id=self.request.user.id))

    def list(self, request, *args, **kwargs):
        query = self.get_queryset()
        serializer = self.get_serializer(query, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
