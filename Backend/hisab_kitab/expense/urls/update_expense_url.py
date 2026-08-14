from django.urls import path

from ..views import UpdateExpense

urlpatterns = [path("update/<int:pk>/", UpdateExpense.as_view(), name="update_expense")]
