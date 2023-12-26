from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    class Role(models.TextChoices):
        CLIENT = "client", _("Client")
        DELIVER = "deliver", _("Deliver")

    phone_number = models.CharField(max_length=10)
    role = models.CharField(
        max_length=10, choices=Role.choices, default=Role.CLIENT
    )

# creating 2 types of user (client/deliver)
class Client(User):
    pass


class Deliver(User):
    pass