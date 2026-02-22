from django.db import models


class Prediction(models.Model):
    """Store prediction history"""
    created_at = models.DateTimeField(auto_now_add=True)
    input_data = models.JSONField()
    predicted_grade = models.FloatField()
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Prediction: {self.predicted_grade:.2f} at {self.created_at}"

