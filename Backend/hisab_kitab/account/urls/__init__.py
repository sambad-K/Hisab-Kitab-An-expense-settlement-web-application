from .auth_url import urlpatterns as auth_url
from .login_url import urlpatterns as login_url
from .logout_url import urlpatterns as logout_url
from .register_url import urlpatterns as register_url
from .reset_password_request_url import urlpatterns as reset_request_url
from .reset_password_url import urlpatterns as reset_password_url

app_name = "account"
urlpatterns = (
    login_url
    + register_url
    + auth_url
    + logout_url
    + reset_request_url
    + reset_password_url
)
