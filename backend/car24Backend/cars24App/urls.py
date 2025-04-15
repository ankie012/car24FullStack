
from django.urls import path
from .views import FilterCarsView

urlpatterns = [
    path('cars/', FilterCarsView.as_view(), name='filter-cars'),  # RESTful endpoint
]
