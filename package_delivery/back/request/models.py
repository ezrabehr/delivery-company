from django.db import models
from user.models import Client, Deliver
from django.utils.translation import gettext_lazy as _


class Request(models.Model):
    # creating an enum field for the package size.
    class PackageSize(models.TextChoices):
        SMALL = "small", _("Small")
        MEDIUM = "medium", _("Medium")
        LARGE = "large", _("Large")

    class Status(models.TextChoices):
        PENDING = "pending", _("Pending")
        IN_PROGRESS = "in_progress", _("In Progress")
        COMPLETED = "completed", _("Completed")

    current = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    package_size = models.CharField(
        max_length=10, choices=PackageSize.choices, default=PackageSize.SMALL
    )
    price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.PENDING
    )
    creator = models.ForeignKey(Client, on_delete=models.CASCADE)
    delivery = models.ForeignKey(
        Deliver,
        related_name="delivery_requests",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )

    def delete(self, using=None, keep_parents=False, deletion_context=None):
        # if the request has a delivery person and the "deletion_context" is 'delivery'
        # remove it just from the delivery list
        if self.delivery and deletion_context == "delivery":
            self.delivery = None
            self.save()
        else:
            # If there is no delivery person or "deletion_context" is 'client',
            # delete the request
            super().delete(using, keep_parents)

    def __str__(self):
        return (
            f"Request #{self.id}: {self.current} to {self.destination}, "
            f"Package Size: {self.package_size}, "
            f"Price: {self.price}, Status: {self.status} "
            f"Creator: {self.creator}, Delivery: {self.delivery}"
        )

    # def create_request(request, current, destination, package_size, price, creator):


    def submit(self, current, destination, package_size, price, creator):
        # Create a new Request and save it to the database
        new_request = Request.objects.create(
            current=current,
            destination=destination,
            package_size=package_size,
            price=price,
            creator=creator,
        )
        return new_request
