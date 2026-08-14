from django.urls import path

from ..views import ToggleSettlementStatus

urlpatterns = [
    path(
        "togglesettlement/<int:pk>/",
        ToggleSettlementStatus.as_view(),
        name="toggle_settlement",
    )
]
