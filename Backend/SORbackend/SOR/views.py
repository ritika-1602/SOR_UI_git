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


from rest_framework import viewsets
from .models import Client, ClientInfo, ProductInfo, RetentionInfo, PremiumInfo, DiscountInfo
from .serializers import (
    ClientSerializer,
    ClientInfoSerializer,
    ProductInfoSerializer,
    RetentionInfoSerializer,
    PremiumInfoSerializer,
    DiscountInfoSerializer
)

# ViewSet for main Client (base model that links all sections)
class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all().order_by('-createdAt')
    serializer_class = ClientSerializer

# Section 1: Client Info
class ClientInfoViewSet(viewsets.ModelViewSet):
    queryset = ClientInfo.objects.all()
    serializer_class = ClientInfoSerializer

# Section 2: Product Info
class ProductInfoViewSet(viewsets.ModelViewSet):
    queryset = ProductInfo.objects.all()
    serializer_class = ProductInfoSerializer

# Section 3: Retention Info
class RetentionInfoViewSet(viewsets.ModelViewSet):
    queryset = RetentionInfo.objects.all()
    serializer_class = RetentionInfoSerializer

# Section 4: Premium Info
class PremiumInfoViewSet(viewsets.ModelViewSet):
    queryset = PremiumInfo.objects.all()
    serializer_class = PremiumInfoSerializer

# Section 5: Discount Info
class DiscountInfoViewSet(viewsets.ModelViewSet):
    queryset = DiscountInfo.objects.all()
    serializer_class = DiscountInfoSerializer
