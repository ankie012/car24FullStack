
from django.urls import path

from . import views

urlpatterns = [
    
    path('viewapi/',views.carListAPI)
]