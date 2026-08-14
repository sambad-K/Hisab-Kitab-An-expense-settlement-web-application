from django.urls import path

from ..views import GetExpense

urlpatterns = [path("getexpense/<int:pk>/", GetExpense.as_view(), name="get_expense")]
