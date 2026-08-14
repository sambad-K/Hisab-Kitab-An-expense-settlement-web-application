from django.urls import path

from .views import DashBoard

app_name = "Dashboard"
urlpatterns = [path("", DashBoard.as_view())]
