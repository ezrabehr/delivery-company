from django.urls import path
from .views import * 

urlpatterns = [
    path("home", home_view),
    path("client/<int:client_id>/requests",client_requests),
    path("client/<int:client_id>/requests/<int:request_id>",client_requests_id),
    path("delivery/<int:delivery_id>/requests",delivery_requests),
    path("delivery/<int:delivery_id>/list", delivery_list),
    path("delivery/<int:delivery_id>/list/<int:request_id>", delivery_list_request_id),
]
