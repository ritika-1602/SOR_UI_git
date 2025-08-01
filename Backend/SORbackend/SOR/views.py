# from django.shortcuts import render

# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework import status
# from django.contrib.auth import authenticate

# @api_view(['POST'])
# def login(request):
#     username = request.data.get("username")
#     password = request.data.get("password")
#     user = authenticate(username=username, password=password)

#     if user is not None:
#         return Response({
#             "message": "Login successful!",
#             "username": user.username,
#             "password": user.password
#         }, status=status.HTTP_200_OK)
#     else:
#         return Response({"error": "Invalid credentials!"}, status=status.HTTP_400_BAD_REQUEST)


# from rest_framework import viewsets
# from .models import Client, ClientInfo, ProductInfo, RetentionInfo, PremiumInfo, DiscountInfo
# from .serializers import (
#     ClientSerializer,
#     ClientInfoSerializer,
#     ProductInfoSerializer,
#     RetentionInfoSerializer,
#     PremiumInfoSerializer,
#     DiscountInfoSerializer
# )
# from django_filters.rest_framework import DjangoFilterBackend

# # ViewSet for main Client (base model that links all sections)
# class ClientViewSet(viewsets.ModelViewSet):
#     queryset = Client.objects.all().order_by('-createdAt')
#     serializer_class = ClientSerializer

# # Section 1: Client Info
# # class ClientInfoViewSet(viewsets.ModelViewSet):
# #     queryset = ClientInfo.objects.all()
# #     serializer_class = ClientInfoSerializer
# class ClientInfoViewSet(viewsets.ModelViewSet):
#     queryset = ClientInfo.objects.all()
#     serializer_class = ClientInfoSerializer
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ['client']

# # Section 2: Product Info
# # class ProductInfoViewSet(viewsets.ModelViewSet):
# #     queryset = ProductInfo.objects.all()
# #     serializer_class = ProductInfoSerializer
# class ProductInfoViewSet(viewsets.ModelViewSet):
#     queryset = ProductInfo.objects.all()
#     serializer_class = ProductInfoSerializer
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ['client']

# # Section 3: Retention Info
# # class RetentionInfoViewSet(viewsets.ModelViewSet):
# #     queryset = RetentionInfo.objects.all()
# #     serializer_class = RetentionInfoSerializer
# class RetentionInfoViewSet(viewsets.ModelViewSet):
#     queryset = RetentionInfo.objects.all()
#     serializer_class = RetentionInfoSerializer
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ['client']

# # Section 4: Premium Info
# # class PremiumInfoViewSet(viewsets.ModelViewSet):
# #     queryset = PremiumInfo.objects.all()
# #     serializer_class = PremiumInfoSerializer
# class PremiumInfoViewSet(viewsets.ModelViewSet):
#     queryset = PremiumInfo.objects.all()
#     serializer_class = PremiumInfoSerializer
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ['client']

# # Section 5: Discount Info
# # class DiscountInfoViewSet(viewsets.ModelViewSet):
# #     queryset = DiscountInfo.objects.all()
# #     serializer_class = DiscountInfoSerializer
# class DiscountInfoViewSet(viewsets.ModelViewSet):
#     queryset = DiscountInfo.objects.all()
#     serializer_class = DiscountInfoSerializer
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ['client']



from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login

from .models import (
    Client, ClientInfo, ProductInfo, RetentionInfo,
    PremiumRate, Discount
)
from .serializers import (
    ClientSerializer, ClientInfoSerializer, ProductInfoSerializer,
    RetentionInfoSerializer, PremiumRateSerializer, DiscountSerializer
)

# 🔐 LOGIN VIEW
@api_view(['POST'])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(username=username, password=password)

    if user is not None:
        login(request, user)
        return Response({
            "message": "Login successful!",
            "username": user.username,
        }, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid credentials!"}, status=status.HTTP_400_BAD_REQUEST)


# 📁 CLIENT MAIN VIEW
class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all().order_by('-createdAt')
    serializer_class = ClientSerializer


# 🔹 SECTION 1: Client Info
class ClientInfoViewSet(viewsets.ModelViewSet):
    queryset = ClientInfo.objects.all()
    serializer_class = ClientInfoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['client']


# 🔹 SECTION 2: Product Info
class ProductInfoViewSet(viewsets.ModelViewSet):
    queryset = ProductInfo.objects.all()
    serializer_class = ProductInfoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['client']


# 🔹 SECTION 3: Retention Info
class RetentionInfoViewSet(viewsets.ModelViewSet):
    queryset = RetentionInfo.objects.all()
    serializer_class = RetentionInfoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['client']


# 🔹 SECTION 4: Premium Rate Info (NEW)
class PremiumRateViewSet(viewsets.ModelViewSet):
    queryset = PremiumRate.objects.all()
    serializer_class = PremiumRateSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['product']  # Fetch by productID


# 🔹 SECTION 5: Discount Info (NEW)
class DiscountViewSet(viewsets.ModelViewSet):
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer
    filter_backends = [DjangoFilterBackend]
<<<<<<< HEAD
    filterset_fields = ['product']  # Fetch by productID
=======
    filterset_fields = ['product']  # Fetch by productID
>>>>>>> main
