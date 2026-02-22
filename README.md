# Student Performance Predictor

A full-stack web application that predicts student academic performance using Machine Learning (Linear Regression). Built with Django REST Framework backend and React frontend, featuring Google OAuth authentication.

## 🎯 Features

- **ML-Powered Predictions**: Linear Regression model (R² = 0.724, MSE = 5.66)
- **Simplified Form**: Only 8 essential fields needed (reduced from 30+ based on correlation analysis)
- **Google OAuth**: Secure authentication with JWT tokens
- **Interactive Analytics**: Real-time charts showing grade distribution, trends, and correlations
- **Dataset Management**: Upload, view, download, and delete datasets
- **Model Training**: Train and activate ML models directly from the UI
- **Student Records**: View student data from uploaded datasets

## 📊 Key Insights

The prediction form was simplified using correlation analysis:
- **G1** (First Period Grade): 0.801 correlation with final grade (G3)
- **G2** (Second Period Grade): 0.905 correlation with final grade (G3)

### Required Fields
1. **G1** - First period grade (0-20)
2. **G2** - Second period grade (0-20)
3. **failures** - Number of past class failures (0-4)
4. **studytime** - Weekly study time (1-4)
5. **absences** - Number of school absences (0-93)
6. **Medu** - Mother's education level (0-4)
7. **higher** - Wants higher education (yes/no)
8. **schoolsup** - Extra educational support (yes/no)

## 🚀 Quick Start

### Prerequisites
- Python 3.13+
- Node.js 18+
- pnpm (or npm)
- Google Cloud OAuth credentials

### 1. Clone the Repository
```bash
git clone https://github.com/Sam-200051806/college-project.git
cd college-project/Predicting-student-Performance-Using-Regression-Analysis
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On macOS/Linux
# or
venv\Scripts\activate     # On Windows

# Install dependencies
pip install -r requirements.txt

# Create .env file (copy from .env.example)
cp .env.example .env
```

Edit `backend/.env` with your credentials:
```env
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
SECRET_KEY=your-django-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
FRONTEND_URL=http://localhost:5173
```

```bash
# Run migrations
python manage.py migrate

# Train the ML model
python manage.py shell
>>> from predictor.ml_model.train_model import train_and_save_model
>>> train_and_save_model()
>>> exit()

# Start backend server
python manage.py runserver
```

Backend will run on http://localhost:8000

### 3. Frontend Setup

```bash
# Navigate to frontend (from project root)
cd frontend

# Install dependencies
pnpm install
# or
npm install

# Create .env file (optional)
cp .env.example .env

# Start development server
pnpm dev
# or
npm run dev
```

Frontend will run on http://localhost:5173

## 🔐 Getting Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure consent screen
6. Set **Authorized JavaScript origins**:
   - `http://localhost:5173`
7. Set **Authorized redirect URIs**:
   - `http://localhost:5173`
8. Copy **Client ID** and **Client Secret** to your `.env` files

## 📁 Project Structure

```
Predicting-student-Performance-Using-Regression-Analysis/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env.example
│   ├── predictor/
│   │   ├── models.py           # Database models
│   │   ├── views.py            # API endpoints
│   │   ├── serializers.py      # DRF serializers
│   │   └── ml_model/
│   │       ├── predictor.py    # ML prediction logic
│   │       └── train_model.py  # Model training
│   └── student_performance/
│       └── settings.py         # Django settings
├── frontend/
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── App.jsx             # Main component
│       ├── api.js              # API client
│       └── components/
│           ├── PredictionForm.jsx  # Simplified 8-field form
│           ├── AnalyticsPage.jsx   # Charts & insights
│           ├── DatasetsPage.jsx    # Dataset management
│           └── ...
└── data/
    └── student+performance/
        └── student/
            ├── student-mat.csv  # Mathematics dataset (395 records)
            └── student-por.csv  # Portuguese dataset
```

## 🔧 Tech Stack

**Backend:**
- Django 6.0.2
- Django REST Framework 3.16.1
- scikit-learn 1.8.0 (Linear Regression)
- pandas, numpy
- djangorestframework-simplejwt 5.5.1
- google-auth 2.37.0

**Frontend:**
- React 18.2.0
- Vite 5.0.0
- Axios 1.7.9
- CSS3 (custom styling)

**Database:**
- SQLite (development)

## 📊 API Endpoints

### Authentication
- `POST /api/auth/google/` - Google OAuth login
- `POST /api/auth/refresh/` - Refresh access token
- `POST /api/auth/logout/` - Logout user

### Predictions
- `POST /api/predictions/` - Make a prediction
- `GET /api/predictions/` - Get prediction history

### Datasets
- `GET /api/datasets/` - List all datasets
- `POST /api/datasets/upload/` - Upload CSV
- `GET /api/datasets/<filename>/` - Download dataset
- `DELETE /api/datasets/<filename>/` - Delete dataset

## 📈 Model Performance

- **Algorithm**: Linear Regression
- **R² Score**: 0.7241
- **Mean Squared Error**: 5.6566
- **Training Samples**: 316
- **Total Dataset**: 395 records
- **Features Used**: 8 (simplified from 33)

## 🤝 Contributing

This is a college project. Suggestions and improvements are welcome!

## 📄 License

This project is for educational purposes.

## 👨‍💻 Author

**Sambhav Seth** (Sam-200051806)

## 🙏 Acknowledgments

- Dataset: UCI Machine Learning Repository - Student Performance Data Set
- Original study by P. Cortez and A. Silva
