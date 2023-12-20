from rest_framework import serializers
from .models import User
from request.models import Request


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "username",
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "password",
            "role",
            "id",
        ]

class RequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = Request
        fields = '__all__'

class RequestUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = ["status"]

    def validate(self, data):
        # Check that the only allowed field is 'status'
        allowed_fields = ["status"]
        for field in data.keys():
            if field not in allowed_fields:
                raise serializers.ValidationError(
                    f"Updating '{field}' is not allowed for delivery person."
                )

        return data
