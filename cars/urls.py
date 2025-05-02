from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import CarViewSet

router = DefaultRouter()
router.register(r'cars', CarViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('cars-list/', views.car_list, name='car-list'),
]