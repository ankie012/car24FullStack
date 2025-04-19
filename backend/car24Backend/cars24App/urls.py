
from django.urls import path
from .views import FilterCarsView
# from .views import carListApi
urlpatterns = [
    path('filtercars/', FilterCarsView.as_view(), name='filter-cars'), 
    # path('viewapi/',carListApi.as_view(),name='carList-view ' ) ,  
]
