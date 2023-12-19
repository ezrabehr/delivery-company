from django.forms import ValidationError
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from .models import Client, Deliver, User
from request.models import Request
from django.core.serializers import serialize
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .serializers import RequestUpdateSerializer, UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken


@api_view(["POST"])
def user_signup(request):
    username = request.data.get("username")
    first_name = request.data.get("firstName")
    last_name = request.data.get("lastName")
    email = request.data.get("email")
    password = request.data.get("password")
    confirmPassword = request.data.get("confirmPassword")
    phone_number = request.data.get("phoneNumber")
    user = request.data.get("user")

    type_of_user = None

    # Check if passwords match
    if password != confirmPassword:
        return Response(
            {"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST
        )

    # Checking what type of user
    if user == "client":
        type_of_user = Client
    else:
        type_of_user = Deliver

    try:
        user_info = type_of_user.objects.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password,
            phone_number=phone_number,
        )

        user_info_db = User.objects.get(username=username)
        ser_user = UserSerializer(user_info_db).data
        return Response(
            {
                "message": f"{type_of_user} created successfully",
                "user": ser_user,
            },
            status=status.HTTP_201_CREATED,
        )
    except ValidationError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def user_login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(request, username=username, password=password)

    if user:
        user_info = User.objects.get(username=username)
        ser_user = UserSerializer(user_info).data
        return Response(
            {
                "user": ser_user,
            },
            status=status.HTTP_200_OK,
        )
    else:
        # Authentication failed
        return Response(
            {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
        )


# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def user_logout(request):
#     logout(request)
#     return Response({"message": "Successfully logged out."})


@api_view(["GET", "DELETE"])
def client_requests(request, client_id):
    client = get_object_or_404(Client, id=client_id)

    if request.method == "GET":
        client_requests = Request.objects.filter(creator=client)
        serializer = UserSerializer(client_requests, many=True)

        data = {
            "client_requests": serializer.data,
            "client": {"id": client.id, "username": client.username},
        }
        return Response(data)

    elif request.method == "DELETE":
        Request.objects.filter(creator=client).delete()
        return Response({"message": "Client requests deleted successfully"})

    else:
        return Response(
            {"error": "Method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED
        )


@api_view(["GET", "DELETE"])
def client_requests_id(request, client_id, request_id):
    client = get_object_or_404(Client, id=client_id)
    specific_request = get_object_or_404(Request, id=request_id, creator=client)

    if request.method == "GET":
        # Serialize the specific_request and client instances
        request_serializer = UserSerializer(specific_request)
        client_serializer = UserSerializer(client)

        data = {
            "specific_request": request_serializer.data,
            "client": client_serializer.data,
        }

        return Response(data)

    elif request.method == "DELETE":
        # Delete the specific_request
        specific_request.delete()

        return Response({"message": "Specific request deleted successfully"})

    else:
        # Return a method not allowed response for other request methods
        return Response(
            {"error": "Method not allowed"},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )


@api_view(["GET"])
def delivery_requests(request, delivery_id):
    if request.method == "GET":
        # Uncomment if necessary
        # deliver = get_object_or_404(Deliver, id=delivery_id)

        all_requests = Request.objects.all()
        serializer = UserSerializer(all_requests, many=True)

        return Response({"requests": serializer.data})

    else:
        return Response(
            {"error": "Method not allowed"},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )


@api_view(["GET", "DELETE"])
def delivery_list(request, delivery_id):
    delivery_person = get_object_or_404(Deliver, id=delivery_id)

    if request.method == "GET":
        # Use the related_name to get all requests associated with the delivery person
        delivery_requests = Request.objects.filter(delivery=delivery_person)
        serializer = UserSerializer(delivery_requests, many=True)

        return Response({"delivery_requests": serializer.data})

    elif request.method == "DELETE":
        # Delete all requests associated with the delivery person
        Request.objects.filter(delivery=delivery_person).delete()

        return Response({"message": "All delivery requests deleted successfully"})

    else:
        return Response(
            {"error": "Method not allowed"},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )


@api_view(["GET", "PUT", "DELETE"])
def delivery_list_request_id(request, delivery_id, request_id):
    delivery_person = get_object_or_404(Deliver, id=delivery_id)
    specific_request = get_object_or_404(
        Request, id=request_id, delivery=delivery_person
    )

    if request.method == "GET":
        # Serialize and return the specific request associated with the delivery person
        serializer = UserSerializer(specific_request)
        return Response({"specific_request": serializer.data})

    elif request.method == "PUT":
        # Update the specific request if needed
        # You need to handle the request data and update the specific_request fields accordingly
        # For simplicity, let's assume you have a RequestUpdateSerializer for partial updates
        serializer = RequestUpdateSerializer(
            specific_request, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Request updated successfully"})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        # Remove the association between the delivery person and the specific request
        specific_request.delete(deletion_context="delivery")

        return Response(
            {"message": "Delivery association with the request removed successfully"}
        )

    else:
        return Response(
            {"error": "Method not allowed"},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )
