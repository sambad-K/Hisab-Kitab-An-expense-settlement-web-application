# Create your views here.
from django.db.models import Q
from rest_framework import generics

from .models import Activity
from .pagination import ActivityPagination
from .serializers import ActivitySerializer


class GetActivity(generics.ListAPIView):
    serializer_class = ActivitySerializer
    pagination_class=ActivityPagination

    def get_queryset(self):
        query = self.request.query_params.get("q")
        activity_type=self.request.query_params.get("type")
        queryset = Activity.objects.filter(user=self.request.user).order_by("-created_at")
        if query:
            queryset = queryset.filter(
                Q(title__icontains=query) | Q(type__icontains=query)).filter(user=self.request.user)
        if (activity_type):
            queryset=queryset.filter(Q(type__icontains=activity_type))
        return queryset
