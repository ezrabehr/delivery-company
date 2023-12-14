from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.
def home_view(request):
    return HttpResponse("home!!")

def client_requests(request):
    pass

def client_requests_id(request):
    pass

def delivery_requests(request):
    pass

def delivery_list(request):
    pass

def delivery_list_request_id(request):
    pass