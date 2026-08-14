from django.urls import path

from ..views import UserLogin

urlpatterns = [
    path("account/login/", UserLogin.as_view(), name="login"),
]
