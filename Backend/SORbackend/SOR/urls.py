# from django.urls import path, include
# from .views import login

# urlpatterns = [
#     path('login/', login, name='login'),
# ]

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ClientViewSet,
    ClientInfoViewSet,
    ProductInfoViewSet,
    RetentionInfoViewSet,
    PremiumInfoViewSet,
    DiscountInfoViewSet,
    login
)

router = DefaultRouter()
router.register(r'clients', ClientViewSet, basename='client')
router.register(r'client-info', ClientInfoViewSet, basename='client-info')
router.register(r'product-info', ProductInfoViewSet, basename='product-info')
router.register(r'retention-info', RetentionInfoViewSet, basename='retention-info')
router.register(r'premium-info', PremiumInfoViewSet, basename='premium-info')
router.register(r'discount-info', DiscountInfoViewSet, basename='discount-info')

urlpatterns = [
    path('login/', login, name='login'),
    path('', include(router.urls)),
]