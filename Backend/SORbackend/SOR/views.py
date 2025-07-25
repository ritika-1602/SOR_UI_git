from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate

@api_view(['POST'])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(username=username, password=password)

    if user is not None:
        return Response({
            "message": "Login successful!",
            "username": user.username,
            "password": user.password
        }, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid credentials!"}, status=status.HTTP_400_BAD_REQUEST)
