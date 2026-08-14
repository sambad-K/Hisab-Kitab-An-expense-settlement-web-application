from django.urls import path

from ..views import CreateSettlement

urlpatterns = [
    path(
        "createsettlement/<int:pk>/",
        CreateSettlement.as_view(),
        name="create_settlement",
    )
]
