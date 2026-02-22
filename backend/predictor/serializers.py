from rest_framework import serializers
from .models import Prediction


class StudentDataSerializer(serializers.Serializer):
    """Serializer for student input data."""
    # Numeric features
    age = serializers.IntegerField(min_value=15, max_value=22, default=17)
    Medu = serializers.IntegerField(min_value=0, max_value=4, default=2, help_text="Mother's education")
    Fedu = serializers.IntegerField(min_value=0, max_value=4, default=2, help_text="Father's education")
    traveltime = serializers.IntegerField(min_value=1, max_value=4, default=1)
    studytime = serializers.IntegerField(min_value=1, max_value=4, default=2)
    failures = serializers.IntegerField(min_value=0, max_value=4, default=0)
    famrel = serializers.IntegerField(min_value=1, max_value=5, default=4, help_text="Family relationship quality")
    freetime = serializers.IntegerField(min_value=1, max_value=5, default=3)
    goout = serializers.IntegerField(min_value=1, max_value=5, default=3)
    Dalc = serializers.IntegerField(min_value=1, max_value=5, default=1, help_text="Daily alcohol consumption")
    Walc = serializers.IntegerField(min_value=1, max_value=5, default=1, help_text="Weekend alcohol consumption")
    health = serializers.IntegerField(min_value=1, max_value=5, default=3)
    absences = serializers.IntegerField(min_value=0, max_value=93, default=0)
    G1 = serializers.IntegerField(min_value=0, max_value=20, default=10, help_text="First period grade")
    G2 = serializers.IntegerField(min_value=0, max_value=20, default=10, help_text="Second period grade")
    
    # Categorical features
    school = serializers.ChoiceField(choices=['GP', 'MS'], default='GP')
    sex = serializers.ChoiceField(choices=['F', 'M'], default='F')
    address = serializers.ChoiceField(choices=['U', 'R'], default='U')
    famsize = serializers.ChoiceField(choices=['GT3', 'LE3'], default='GT3')
    Pstatus = serializers.ChoiceField(choices=['T', 'A'], default='T')
    Mjob = serializers.ChoiceField(choices=['teacher', 'health', 'services', 'at_home', 'other'], default='other')
    Fjob = serializers.ChoiceField(choices=['teacher', 'health', 'services', 'at_home', 'other'], default='other')
    reason = serializers.ChoiceField(choices=['home', 'reputation', 'course', 'other'], default='course')
    guardian = serializers.ChoiceField(choices=['mother', 'father', 'other'], default='mother')
    schoolsup = serializers.ChoiceField(choices=['yes', 'no'], default='no')
    famsup = serializers.ChoiceField(choices=['yes', 'no'], default='yes')
    paid = serializers.ChoiceField(choices=['yes', 'no'], default='no')
    activities = serializers.ChoiceField(choices=['yes', 'no'], default='no')
    nursery = serializers.ChoiceField(choices=['yes', 'no'], default='yes')
    higher = serializers.ChoiceField(choices=['yes', 'no'], default='yes')
    internet = serializers.ChoiceField(choices=['yes', 'no'], default='yes')
    romantic = serializers.ChoiceField(choices=['yes', 'no'], default='no')


class PredictionSerializer(serializers.ModelSerializer):
    """Serializer for prediction results."""
    class Meta:
        model = Prediction
        fields = ['id', 'created_at', 'input_data', 'predicted_grade']
        read_only_fields = ['id', 'created_at']


class PredictionResultSerializer(serializers.Serializer):
    """Serializer for prediction response."""
    predicted_grade = serializers.FloatField()
    input_data = serializers.DictField()

