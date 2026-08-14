from django.urls import path

from ..views import CheckGroupMember

urlpatterns = [path("checkmember/", CheckGroupMember.as_view(), name="check_member")]
