from django.urls import path

from ..views import UpdateExpensePerMember

urlpatterns = [
    path(
        "updateexpenseper/<int:pk>/",
        UpdateExpensePerMember.as_view(),
        name="update_expense_per_member",
    )
]
