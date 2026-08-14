from django.urls import path

from ..views import DeleteExpense

urlpatterns = [path("delete/<int:pk>/", DeleteExpense.as_view(), name="update_expense")]
