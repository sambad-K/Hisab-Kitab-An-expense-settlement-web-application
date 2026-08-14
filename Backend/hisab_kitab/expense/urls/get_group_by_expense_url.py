from django.urls import path

from ..views import GetGroupByExpense

urlpatterns = [path("getgroup/<int:pk>/", GetGroupByExpense.as_view())]
