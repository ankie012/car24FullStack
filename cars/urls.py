from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import CarViewSet, CarDetailView, search_cars, car_statistics
from django.urls import path
from .views import SelectOrders, SubmitOrder, DisplayOrders

router = DefaultRouter()
router.register(r'cars', CarViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('cars-list/', views.car_list, name='car-list'),
    path('car-detail/<int:pk>/', CarDetailView.as_view(), name='car-detail'),
    path('search/', search_cars, name='search-cars'),
    path('statistics/', car_statistics, name='car-statistics'),
]