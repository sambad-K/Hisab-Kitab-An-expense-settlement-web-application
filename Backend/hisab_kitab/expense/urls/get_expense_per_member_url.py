from django.urls import path

from ..views import GetExpensePerMember

urlpatterns = [
    path(
        "get-expense-per/<int:pk>/",
        GetExpensePerMember.as_view(),
        name="get_expense_per_member",
    )
]
