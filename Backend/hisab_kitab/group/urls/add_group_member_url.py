from django.urls import path

from ..views import AddGroupMember

urlpatterns = [
    path("add/<int:pk>/<int:id>", AddGroupMember.as_view(), name="add_member")
]
