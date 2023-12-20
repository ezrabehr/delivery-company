from django.urls import path
from .views import *

urlpatterns = [
    path("signup", user_signup, name="signup"),
    path("login", user_login, name="login"),
    path(
        "client/<int:client_id>/requests/",
        client_requests,
        name="client_requests",
    ),
    path(
        "client/<str:client_username>/requests/<int:request_id>",
        client_requests_id,
        name="client_requests_id",
    ),
    path(
        "delivery/<str:delivery_username>/requests",
        delivery_requests,
        name="delivery_requests",
    ),
    path("delivery/<str:delivery_username>/list", delivery_list, name="delivery_list"),
    path(
        "delivery/<str:delivery_username>/list/<int:request_id>",
        delivery_list_request_id,
        name="delivery_list_request_id",
    ),
]
