from django.urls import path

from ..views import GetCreateGroup

urlpatterns = [
    path("group/", GetCreateGroup.as_view(), name="get_create"),
]
