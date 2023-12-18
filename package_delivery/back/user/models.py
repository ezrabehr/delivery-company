from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    phone_number = models.CharField(max_length=10)

    def sign_up(request):
        pass

    def login(request):
        pass


class Client(User):
    def all_client_requests(request):
        pass

    def add_request(request):
        pass

    def delete_request(request):
        pass


class Deliver(User):
    def all_requests(request):
        pass

    def add_requests_to_list(request):
        pass

    def remove_request_from_list(request):
        pass

    def update_request_status(request):
        pass
