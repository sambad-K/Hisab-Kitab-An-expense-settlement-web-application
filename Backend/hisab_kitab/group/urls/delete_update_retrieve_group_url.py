from django.urls import path

from ..views import DeleteUpdateGroup

urlpatterns = [
    path("group/<int:pk>/", DeleteUpdateGroup.as_view(), name="get_create"),
]
