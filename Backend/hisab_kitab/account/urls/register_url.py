from django.urls import path

from ..views import UserRegister

urlpatterns = [
    path("account/register/", UserRegister.as_view(), name="register"),
]
