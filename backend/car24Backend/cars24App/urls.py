
from django.urls import path
from .views import FilterCarsView, CarDetailView
# from .views import carListApi
urlpatterns = [
    path('filtercars/', FilterCarsView.as_view(), name='filter-cars'), 
    path('cars/<str:car_id>/', CarDetailView.as_view(), name='car-detail'),
    # path('viewapi/',carListApi.as_view(),name='carList-view ' ) ,  
]
