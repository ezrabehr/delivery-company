from rest_framework import serializers
from .models import Deliver, Client
from request.models import Request

class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = '__all__'

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class RequestUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = ['status']

    def validate(self, data):
        # Check that the only allowed field is 'status'
        allowed_fields = ['status']
        for field in data.keys():
            if field not in allowed_fields:
                raise serializers.ValidationError(
                    f"Updating '{field}' is not allowed for delivery person."
                )

        return data