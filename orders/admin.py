from django.contrib import admin
from .models import Order, User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'user_type']
    list_filter = ['user_type']
    search_fields = ['name', 'email']

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'car', 'buyer', 'order_date', 'status']
    list_filter = ['status', 'order_date']
    search_fields = ['car__brand', 'car__model', 'buyer__name']
