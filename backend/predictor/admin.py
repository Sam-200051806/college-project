from django.contrib import admin
from .models import Prediction


@admin.register(Prediction)
class PredictionAdmin(admin.ModelAdmin):
    list_display = ['id', 'predicted_grade', 'created_at']
    readonly_fields = ['created_at', 'input_data', 'predicted_grade']

