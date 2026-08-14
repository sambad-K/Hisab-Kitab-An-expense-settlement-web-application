from .get_user_url import urlpatterns as get_user_url
from .search_user_url import urlpatterns as search_user_url
from .update_user_url import urlpatterns as update_user_url

app_name = "user"
urlpatterns = search_user_url + get_user_url + update_user_url
