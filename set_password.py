import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cars24_combined.settings')
django.setup()

from django.contrib.auth.models import User

# Get the admin user and set a password
admin = User.objects.get(username='admin')
admin.set_password('admin123')
admin.save()

print("Password set successfully for admin user")