# / ? in path
from django.urls import path 
from . import views 

urlpatterns = [
    path('',views.mainPage, name='mainPage'),
    path('api/',views.index,name='index'),
]
