from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    phone_number = models.CharField(max_length=10)


class Client(User):
    pass


class Deliver(User):
    pass
