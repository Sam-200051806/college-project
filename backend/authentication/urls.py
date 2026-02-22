from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path('google/', views.google_login, name='google_login'),
    path('logout/', views.logout, name='logout'),
    path('user/', views.get_user_info, name='user_info'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
