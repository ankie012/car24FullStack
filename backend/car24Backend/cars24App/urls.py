
from django.urls import path
from .views import FilterCarsView, CarDetailView, UserSignupView, TestDriveOrderView
# from .views import carListApi
urlpatterns = [
    path('api/filtercars/', FilterCarsView.as_view(), name='filter-cars'), 
    path('api/cars/<str:car_id>/', CarDetailView.as_view(), name='car-detail'),
    path('api/signup/', UserSignupView.as_view(), name='user-signup'),
    path('api/test-drive-orders/', TestDriveOrderView.as_view(), name='test-drive-orders'),
    path('api/test-drive-orders/<str:order_id>/', TestDriveOrderView.as_view(), name='test-drive-order-detail'),
    # path('viewapi/',carListApi.as_view(),name='carList-view ' ) ,  
]
