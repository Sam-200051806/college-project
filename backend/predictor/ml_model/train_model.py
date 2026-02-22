"""
Script to train and save the Linear Regression model for student performance prediction.
Run this script once to generate the trained model file.
"""
import os
import pandas as pd
import numpy as np
from sklearn import linear_model
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import joblib

# Get the directory where this script is located
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(SCRIPT_DIR))), 'data')
MODEL_PATH = os.path.join(SCRIPT_DIR, 'trained_model.joblib')
METADATA_PATH = os.path.join(SCRIPT_DIR, 'model_metadata.joblib')


def train_and_save_model():
    """Train the model and save it along with metadata."""
    # Load the dataset
    file_path = os.path.join(DATA_DIR, "student-mat.csv")
    
    if not os.path.exists(file_path):
        print(f"Error: Dataset not found at {file_path}")
        print("Please download the student-mat.csv file and place it in the 'data' folder.")
        return False
    
    data = pd.read_csv(file_path, sep=';')
    
    # Store original column info before one-hot encoding
    categorical_columns = ['school', 'sex', 'address', 'famsize', 'Pstatus',
                          'Mjob', 'Fjob', 'reason', 'guardian', 'schoolsup',
                          'famsup', 'paid', 'activities', 'nursery', 'higher',
                          'internet', 'romantic']
    
    # Convert categorical variables to one-hot encoding
    data_encoded = pd.get_dummies(data, columns=categorical_columns, drop_first=True)
    
    # Select features and target variable
    features = data_encoded.drop(columns=['G3'])
    target = data_encoded['G3']
    
    # Get feature names after encoding
    feature_names = features.columns.tolist()
    
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(
        features, target, test_size=0.2, random_state=42
    )
    
    # Train the model
    model = linear_model.LinearRegression()
    model.fit(X_train, y_train)
    
    # Evaluate
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    # Save the model
    joblib.dump(model, MODEL_PATH)
    
    # Save metadata
    metadata = {
        'feature_names': feature_names,
        'mse': mse,
        'r2': r2,
        'categorical_columns': categorical_columns,
        'train_size': len(X_train),
        'test_size': len(X_test),
    }
    joblib.dump(metadata, METADATA_PATH)
    
    print(f"Model trained and saved successfully!")
    print(f"Mean Squared Error: {mse:.4f}")
    print(f"R² Score: {r2:.4f}")
    print(f"Model saved to: {MODEL_PATH}")
    
    return True


if __name__ == "__main__":
    train_and_save_model()

