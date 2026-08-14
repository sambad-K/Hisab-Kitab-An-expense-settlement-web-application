from django.urls import path

from ..views import GetGroupMember

urlpatterns = [
    path("groupmembers/<int:pk>", GetGroupMember.as_view(), name="group_members")
]
