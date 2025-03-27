from .views import index, rupesh , filterAPI
from django.urls import path

urlpatterns = [
    path('index/', index),
    path('rupesh/', rupesh),
    path('filters/', filterAPI),
]









