from django.urls import path
from .views import * 

urlpatterns = [
    # path("home", home_view, name='home'),
    # path("", home_view, name='home'),
    path('signup', user_signup, name='signup'),
    path('login', user_login, name='login'),
    path('logout', user_logout, name='logout'),
    path("client/<int:client_id>/requests",client_requests, name='client_requests'),
    path("client/<int:client_id>/requests/<int:request_id>",client_requests_id, name='client_requests_id'),
    path("delivery/<int:delivery_id>/requests",delivery_requests, name='delivery_requests'),
    path("delivery/<int:delivery_id>/list", delivery_list, name='delivery_list'),
    path("delivery/<int:delivery_id>/list/<int:request_id>", delivery_list_request_id, name='delivery_list_request_id'),
]
