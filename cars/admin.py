from django.contrib import admin
from .models import Car

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ['brand', 'model', 'year', 'price', 'is_sold']
    list_filter = ['brand', 'is_sold', 'year']
    search_fields = ['brand', 'model', 'customer_name']
