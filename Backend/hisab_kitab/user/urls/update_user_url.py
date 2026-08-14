from django.urls import path

from ..views import UpdateUser

urlpatterns = [path("update/<int:pk>/", UpdateUser.as_view(), name="update")]
