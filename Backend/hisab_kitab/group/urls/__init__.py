from .add_group_member_url import urlpatterns as add_group_member_url
from .check_group_member_url import urlpatterns as check_group_member_url
from .delete_group_member_url import urlpatterns as delete_group_member_url
from .delete_update_retrieve_group_url import (
    urlpatterns as delete_update_retrieve_group_url,
)
from .get_create_group_url import urlpatterns as get_create_group_url
from .get_group_members_url import urlpatterns as get_group_members_url

app_name = "group"
urlpatterns = (
    delete_update_retrieve_group_url
    + get_create_group_url
    + check_group_member_url
    + get_group_members_url
    + add_group_member_url
    + delete_group_member_url
)
