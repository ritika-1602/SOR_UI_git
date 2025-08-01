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
    PremiumRateViewSet,
    DiscountViewSet,
    login_view
)

router = DefaultRouter()
router.register(r'clients', ClientViewSet, basename='client')
router.register(r'client-info', ClientInfoViewSet, basename='client-info')
router.register(r'product-info', ProductInfoViewSet, basename='product-info')
router.register(r'retention-info', RetentionInfoViewSet, basename='retention-info')
router.register(r'premium-rates', PremiumRateViewSet, basename='premium-rate')
router.register(r'discounts', DiscountViewSet, basename='discount')

urlpatterns = [
    path('login/', login_view, name='login'),
    path('', include(router.urls)),
]