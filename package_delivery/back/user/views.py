from django.forms import ValidationError
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from .models import Client, Deliver, User
from request.models import Request
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import RequestSerializer, UserSerializer


# /signup
@api_view(["POST"])
def user_signup(request):
    if request.method == "POST":
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
            type_of_user.objects.create_user(
                username=username,
                first_name=first_name,
                last_name=last_name,
                email=email,
                password=password,
                phone_number=phone_number,
                role=user,
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

    else:
        return Response(
            {"error": "Method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED
        )


# /login
@api_view(["POST"])
def user_login(request):
    if request.method == "POST":
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

    else:
        return Response(
            {"error": "Method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED
        )


# /client/<int:client_id>/requests
@api_view(["POST", "GET", "DELETE"])
def client_requests(request, client_id):
    client = get_object_or_404(Client, user_ptr_id=client_id)

    if request.method == "POST":
        destination = request.data.get("to")
        current = request.data.get("from")
        package_size = request.data.get("packageSize")
        price = request.data.get("payment")

        try:
            Request.objects.create(
                current=current,
                destination=destination,
                package_size=package_size,
                price=price,
                creator=client,
            )

            return Response(
                {"message": "request created successfully"},
                status=status.HTTP_201_CREATED,
            )

        except User.DoesNotExist:
            return Response(
                {"error": "client not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )

    elif request.method == "GET":
        client_requests = Request.objects.filter(creator=client)
        serializer = RequestSerializer(client_requests, many=True).data

        data = {
            "client_requests": serializer,
            "client": {
                "id": client.id,
                "username": client.username,
                "email": client.email,
                "phone_number": client.phone_number,
            },
        }
        return Response(data)

    elif request.method == "DELETE":
        Request.objects.filter(creator=client).delete()
        return Response({"message": "Client requests deleted successfully"})

    else:
        return Response(
            {"error": "Method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED
        )


# /client/<int:client_id>/requests/<int:request_id>
@api_view(["DELETE"])
def client_requests_id(request, client_id, request_id):
    if request.method == "DELETE":
        client = get_object_or_404(Client, user_ptr_id=client_id)
        specific_request = get_object_or_404(Request, id=request_id, creator=client)

        specific_request.delete()

        return Response({"message": "Specific request deleted successfully"})

    else:
        return Response(
            {"error": "Method not allowed"},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )


# /delivery/<int:delivery_id>/requests
@api_view(["GET"])
def delivery_requests(request, delivery_id):
    if request.method == "GET":
        get_object_or_404(Deliver, user_ptr_id=delivery_id)

        all_requests = Request.objects.all()
        ser_requests = RequestSerializer(all_requests, many=True).data

        # getting all clients who created a request
        creator_ids = set(request.creator_id for request in all_requests)
        creators = User.objects.filter(id__in=creator_ids)
        ser_creators = UserSerializer(creators, many=True).data
        creators_list = list(ser_creators)

        data = {
            "requests": ser_requests,
            "creators": creators_list,
        }
        return Response(data)

    else:
        return Response(
            {"error": "Method not allowed"},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )


# /delivery/<int:delivery_id>/request/<int:request_id>
@api_view(["PUT"])
def add_deliver_to_request(request, delivery_id, request_id):
    if request.method == "PUT":
        deliver = get_object_or_404(Deliver, user_ptr_id=delivery_id)
        specific_request = get_object_or_404(Request, id=request_id)

        specific_request.delivery_id = deliver
        specific_request.save()

        return Response({"worked": "request was associated to deliver"})

    else:
        return Response(
            {"error": "Method not allowed"},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )


# /delivery/<int:delivery_id>/list
@api_view(["GET", "DELETE"])
def delivery_list(request, delivery_id):
    deliver = get_object_or_404(Deliver, user_ptr_id=delivery_id)

    if request.method == "GET":
        delivery_requests = Request.objects.filter(delivery_id=deliver)
        del_ser = RequestSerializer(delivery_requests, many=True).data

        # getting all clients who created a request
        creator_ids = set(request.creator_id for request in delivery_requests)
        creators = User.objects.filter(id__in=creator_ids)
        ser_creators = UserSerializer(creators, many=True).data
        creators_list = list(ser_creators)

        data = {
            "requests": del_ser,
            "creators": creators_list,
        }
        return Response(data)

    elif request.method == "DELETE":
        # Delete all requests associated with the delivery person
        deleted_requests = Request.objects.filter(delivery_id=deliver)
        for request in deleted_requests:
            print(request)
            request.delivery_id = None
            request.save()
        return Response({"message": "All delivery requests deleted successfully"})

    else:
        return Response(
            {"error": "Method not allowed"},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )


# /delivery/<int:delivery_id>/list/<int:request_id>
@api_view(["PUT", "DELETE"])
def delivery_list_request_id(request, delivery_id, request_id):
    delivery_person = get_object_or_404(Deliver, user_ptr_id=delivery_id)
    specific_request = get_object_or_404(
        Request, id=request_id, delivery_id=delivery_person
    )

    if request.method == "PUT":
        specific_request.status = request.data.get("status")
        specific_request.save()

        return Response({"message": "Request updated successfully"})

    elif request.method == "DELETE":
        specific_request.delivery_id = None
        specific_request.save()

        return Response(
            {"message": "Delivery association with the request removed successfully"}
        )

    else:
        return Response(
            {"error": "Method not allowed"},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )
