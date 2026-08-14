from django.urls import path

from ..views import ResetPassword

urlpatterns = [
    path(
        "resetpassword/<uidb64>/<token>/",
        ResetPassword.as_view(),
        name="reset-password",
    )
]
