
from django.urls import path

from . import views

urlpatterns = [
    
    path('viewapi/',views.carListAPI),
    path('filterapi/',views.filter_api)
]