from django.urls import path

from ..views import RequestPasswordReset

urlpatterns = [
    path("resetpasswordrequest/", RequestPasswordReset.as_view(), name="reset-request")
]
