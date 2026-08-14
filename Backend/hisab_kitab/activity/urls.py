from django.urls import path

from .views import GetActivity

urlpatterns = [
    path("",GetActivity.as_view(),name="activities")
]
