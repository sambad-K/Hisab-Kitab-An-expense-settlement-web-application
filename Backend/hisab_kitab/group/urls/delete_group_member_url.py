from django.urls import path

from ..views import DeleteGroupMember

urlpatterns = [
    path("deletemember/<int:pk>/", DeleteGroupMember.as_view(), name="delete_member")
]
