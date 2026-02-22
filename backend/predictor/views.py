from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import FileResponse, Http404
import os

from .models import Prediction
from .serializers import StudentDataSerializer, PredictionSerializer, PredictionResultSerializer
from .ml_model.predictor import predict, get_model_info


@api_view(['POST'])
def predict_grade(request):
    """
    Predict student's final grade based on input features.
    """
    serializer = StudentDataSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    input_data = serializer.validated_data
    
    try:
        predicted_grade = predict(input_data)
        
        # Save prediction to database
        prediction = Prediction.objects.create(
            input_data=input_data,
            predicted_grade=predicted_grade
        )
        
        result = {
            'predicted_grade': round(predicted_grade, 2),
            'input_data': input_data,
            'prediction_id': prediction.id
        }
        
        return Response(result, status=status.HTTP_200_OK)
    
    except FileNotFoundError as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_503_SERVICE_UNAVAILABLE
        )
    except Exception as e:
        return Response(
            {'error': f'Prediction failed: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
def model_info(request):
    """
    Get information about the trained model.
    """
    try:
        info = get_model_info()
        return Response({
            'model_type': 'Linear Regression',
            'metrics': {
                'mean_squared_error': round(info['mse'], 4),
                'r2_score': round(info['r2'], 4),
            },
            'dataset': {
                'train_samples': info['train_size'],
                'test_samples': info['test_size'],
            }
        })
    except FileNotFoundError as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_503_SERVICE_UNAVAILABLE
        )


@api_view(['GET'])
def feature_options(request):
    """
    Get available options for categorical features.
    """
    options = {
        'school': [{'value': 'GP', 'label': 'Gabriel Pereira'}, {'value': 'MS', 'label': 'Mousinho da Silveira'}],
        'sex': [{'value': 'F', 'label': 'Female'}, {'value': 'M', 'label': 'Male'}],
        'address': [{'value': 'U', 'label': 'Urban'}, {'value': 'R', 'label': 'Rural'}],
        'famsize': [{'value': 'GT3', 'label': 'Greater than 3'}, {'value': 'LE3', 'label': 'Less or equal to 3'}],
        'Pstatus': [{'value': 'T', 'label': 'Living together'}, {'value': 'A', 'label': 'Apart'}],
        'Mjob': [{'value': 'teacher', 'label': 'Teacher'}, {'value': 'health', 'label': 'Health care'}, 
                 {'value': 'services', 'label': 'Civil services'}, {'value': 'at_home', 'label': 'At home'}, 
                 {'value': 'other', 'label': 'Other'}],
        'Fjob': [{'value': 'teacher', 'label': 'Teacher'}, {'value': 'health', 'label': 'Health care'}, 
                 {'value': 'services', 'label': 'Civil services'}, {'value': 'at_home', 'label': 'At home'}, 
                 {'value': 'other', 'label': 'Other'}],
        'reason': [{'value': 'home', 'label': 'Close to home'}, {'value': 'reputation', 'label': 'School reputation'}, 
                   {'value': 'course', 'label': 'Course preference'}, {'value': 'other', 'label': 'Other'}],
        'guardian': [{'value': 'mother', 'label': 'Mother'}, {'value': 'father', 'label': 'Father'}, 
                     {'value': 'other', 'label': 'Other'}],
        'schoolsup': [{'value': 'yes', 'label': 'Yes'}, {'value': 'no', 'label': 'No'}],
        'famsup': [{'value': 'yes', 'label': 'Yes'}, {'value': 'no', 'label': 'No'}],
        'paid': [{'value': 'yes', 'label': 'Yes'}, {'value': 'no', 'label': 'No'}],
        'activities': [{'value': 'yes', 'label': 'Yes'}, {'value': 'no', 'label': 'No'}],
        'nursery': [{'value': 'yes', 'label': 'Yes'}, {'value': 'no', 'label': 'No'}],
        'higher': [{'value': 'yes', 'label': 'Yes'}, {'value': 'no', 'label': 'No'}],
        'internet': [{'value': 'yes', 'label': 'Yes'}, {'value': 'no', 'label': 'No'}],
        'romantic': [{'value': 'yes', 'label': 'Yes'}, {'value': 'no', 'label': 'No'}],
    }
    return Response(options)


@api_view(['GET'])
def prediction_history(request):
    """
    Get recent prediction history.
    """
    predictions = Prediction.objects.all()[:20]
    serializer = PredictionSerializer(predictions, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def download_dataset(request, filename):
    """
    Download a dataset file.
    """
    # Define the base data directory
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
    
    # Allowed dataset files for security
    allowed_files = ['student-mat.csv', 'student-por.csv']
    
    if filename not in allowed_files:
        raise Http404("Dataset not found")
    
    # Construct file path
    file_path = os.path.join(base_dir, 'data', filename)
    
    # Check if file exists
    if not os.path.exists(file_path):
        raise Http404("Dataset file not found")
    
    # Return file as response
    try:
        response = FileResponse(open(file_path, 'rb'), content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename="{filename}"'
        return response
    except Exception as e:
        return Response(
            {'error': f'Failed to download file: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

