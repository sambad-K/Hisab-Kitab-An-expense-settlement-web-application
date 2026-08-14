from django.urls import path

from ..views import GetUser

urlpatterns = [path("profile/", GetUser.as_view(), name="profile")]
