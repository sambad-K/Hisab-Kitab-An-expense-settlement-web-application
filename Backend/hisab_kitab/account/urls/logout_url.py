from django.urls import path

from ..views import LogOutView

urlpatterns = [path("logout/", LogOutView.as_view(), name="logout")]
