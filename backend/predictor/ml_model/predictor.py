"""
Module to load and use the trained model for predictions.
"""
import os
import numpy as np
import pandas as pd
import joblib

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(SCRIPT_DIR, 'trained_model.joblib')
METADATA_PATH = os.path.join(SCRIPT_DIR, 'model_metadata.joblib')

# Cache for loaded model and metadata
_model = None
_metadata = None


def load_model():
    """Load the trained model and metadata."""
    global _model, _metadata
    
    if _model is None:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(
                "Model not found. Please run train_model.py first."
            )
        _model = joblib.load(MODEL_PATH)
        _metadata = joblib.load(METADATA_PATH)
    
    return _model, _metadata


def get_model_info():
    """Get model performance metrics."""
    _, metadata = load_model()
    return {
        'mse': metadata['mse'],
        'r2': metadata['r2'],
        'train_size': metadata['train_size'],
        'test_size': metadata['test_size'],
    }


def predict(input_data: dict) -> float:
    """
    Make a prediction based on input data.
    
    Args:
        input_data: Dictionary with student features
        
    Returns:
        Predicted final grade (G3)
    """
    model, metadata = load_model()
    feature_names = metadata['feature_names']
    
    # Create a DataFrame with all features initialized to 0
    df = pd.DataFrame(0, index=[0], columns=feature_names)
    
    # Fill in the numeric features directly
    numeric_features = ['age', 'Medu', 'Fedu', 'traveltime', 'studytime', 
                       'failures', 'famrel', 'freetime', 'goout', 'Dalc', 
                       'Walc', 'health', 'absences', 'G1', 'G2']
    
    for feat in numeric_features:
        if feat in input_data:
            df[feat] = input_data[feat]
    
    # Handle categorical features (one-hot encoded)
    categorical_mappings = {
        'school': ['school_MS'],
        'sex': ['sex_M'],
        'address': ['address_U'],
        'famsize': ['famsize_LE3'],
        'Pstatus': ['Pstatus_T'],
        'Mjob': ['Mjob_health', 'Mjob_other', 'Mjob_services', 'Mjob_teacher'],
        'Fjob': ['Fjob_health', 'Fjob_other', 'Fjob_services', 'Fjob_teacher'],
        'reason': ['reason_home', 'reason_other', 'reason_reputation'],
        'guardian': ['guardian_mother', 'guardian_other'],
        'schoolsup': ['schoolsup_yes'],
        'famsup': ['famsup_yes'],
        'paid': ['paid_yes'],
        'activities': ['activities_yes'],
        'nursery': ['nursery_yes'],
        'higher': ['higher_yes'],
        'internet': ['internet_yes'],
        'romantic': ['romantic_yes'],
    }
    
    for cat_name, encoded_cols in categorical_mappings.items():
        if cat_name in input_data:
            value = input_data[cat_name]
            for col in encoded_cols:
                if col in feature_names:
                    # Check if this encoded column matches the input value
                    expected_value = col.split('_', 1)[1]
                    if str(value).lower() == expected_value.lower():
                        df[col] = 1
    
    # Make prediction
    prediction = model.predict(df)[0]
    
    # Clamp prediction to valid grade range (0-20)
    prediction = max(0, min(20, prediction))
    
    return float(prediction)

