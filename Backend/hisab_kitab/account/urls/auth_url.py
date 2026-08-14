from django.urls import path

from ..views import check_auth

urlpatterns = [path("isloggedin/", check_auth, name="check-auth")]
