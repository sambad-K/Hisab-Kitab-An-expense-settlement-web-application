from django.urls import path

from ..views import GetSettlement

urlpatterns = [
    path("get-settlement/<int:pk>/", GetSettlement.as_view(), name="get_settlement")
]
