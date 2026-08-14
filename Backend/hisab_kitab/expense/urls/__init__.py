from .create_expense_url import urlpatterns as create_expense_url
from .create_settlement_url import urlpatterns as create_settlement_url
from .delete_expense_url import urlpatterns as delete_expense_url
from .get_expense_per_member_url import urlpatterns as get_expense_per_member_url
from .get_expense_url import urlpatterns as get_expense_url
from .get_group_by_expense_url import urlpatterns as get_group_by_expense_url
from .get_settlement_url import urlpatterns as get_settlement_url
from .toggle_settlement_status_url import urlpatterns as toggle_settlement_status_url
from .update_expense_per_member_url import urlpatterns as update_expense_per_member_url
from .update_expense_url import urlpatterns as update_expense_url

app_name = "expense"
urlpatterns = (
    create_expense_url
    + update_expense_url
    + create_settlement_url
    + update_expense_per_member_url
    + toggle_settlement_status_url
    + get_expense_url
    + get_expense_per_member_url
    + get_group_by_expense_url
    + get_settlement_url
    + delete_expense_url
)
