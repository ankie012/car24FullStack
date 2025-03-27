
from django.contrib import admin
from django.urls import path, include
# from django.http import HttpResponse

# Define a simple redirect view for the root URL
# def home_redirect(request):
#     return HttpResponse("<h1>Welcome! Go to <a href='/testing_api/'>testing_api/</a></h1>")

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', home_redirect),  
    path('', include('testing_api.urls')), 
]

