from django.urls import path
from . import views

urlpatterns = [
    path('predict/', views.predict_grade, name='predict_grade'),
    path('model-info/', views.model_info, name='model_info'),
    path('feature-options/', views.feature_options, name='feature_options'),
    path('predictions/', views.prediction_history, name='prediction_history'),
    path('datasets/<str:filename>/', views.download_dataset, name='download_dataset'),
]

