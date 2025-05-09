from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderListCreate, OrderDetail, UserViewSet


router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('orders/', OrderListCreate.as_view(), name='order-list-create'),
    path('orders/<int:pk>/', OrderDetail.as_view(), name='order-detail'),
]