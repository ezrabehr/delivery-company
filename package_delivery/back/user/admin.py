from django.contrib import admin
from .models import Client, Deliver


class CustomAdminModel(admin.ModelAdmin):
    list_display = (
        "username",
        "first_name",
        "last_name",
        "email",
        "phone_number",
    )


admin.site.register([Client, Deliver], CustomAdminModel)

# Register your models here.
