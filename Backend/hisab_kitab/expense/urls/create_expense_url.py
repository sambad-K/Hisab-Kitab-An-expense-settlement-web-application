from django.urls import path

from ..views import CreateExpense

urlpatterns = [path("create/<int:pk>/", CreateExpense.as_view(), name="create_expense")]
