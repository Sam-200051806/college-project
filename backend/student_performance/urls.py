"""
URL configuration for student_performance project.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('predictor.urls')),
    path('api/auth/', include('authentication.urls')),
]

