from django.urls import path

from ..views import SearchUser

urlpatterns = [path("search/", SearchUser.as_view(), name="search")]
