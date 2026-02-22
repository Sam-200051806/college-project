import { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Sidebar from './components/Sidebar';
import PredictionForm from './components/PredictionForm';
import ResultDisplay from './components/ResultDisplay';
import ModelInfo from './components/ModelInfo';
import HomePage from './components/HomePage';
import HistoryPage from './components/HistoryPage';
import AnalyticsPage from './components/AnalyticsPage';
import StudentsPage from './components/StudentsPage';
import DatasetsPage from './components/DatasetsPage';
import ModelsPage from './components/ModelsPage';
import SettingsPage from './components/SettingsPage';
import LoginPage from './components/LoginPage';
import { predictGrade, getModelInfo, getFeatureOptions, getPredictionHistory } from './api';
import { config } from './config';

function App() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modelInfo, setModelInfo] = useState(null);
  const [featureOptions, setFeatureOptions] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [predictions, setPredictions] = useState([]);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    const accessToken = localStorage.getItem('accessToken');
    if (storedUser && accessToken) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchInitialData = async () => {
        try {
          const [model, options] = await Promise.all([
            getModelInfo(),
            getFeatureOptions()
          ]);
          setModelInfo(model);
          setFeatureOptions(options);
        } catch (err) {
          console.error('Failed to fetch initial data:', err);
        }
      };
      fetchInitialData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (activeTab === 'history' || activeTab === 'analytics') {
      getPredictionHistory().then(setPredictions).catch(console.error);
    }
  }, [activeTab]);

  const handlePredict = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await predictGrade(formData);
      setPrediction(result);
      setActiveTab('analytics');
    } catch (err) {
      setError(err.response?.data?.error || 'Prediction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (data) => {
    setUser(data.user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    setActiveTab('home');
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      </GoogleOAuthProvider>
    );
  }

  const getPageTitle = () => {
    const titles = {
      home: 'Home',
      predict: 'Predict Grade',
      analytics: 'Analytics Dashboard',
      history: 'Prediction History',
      students: 'Students',
      datasets: 'Datasets',
      models: 'ML Models',
      settings: 'Settings'
    };
    return titles[activeTab] || 'Dashboard';
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage setActiveTab={setActiveTab} modelInfo={modelInfo} />;

      case 'predict':
        return (
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <span className="card-title-icon">🎯</span>
                Enter Student Information
              </div>
            </div>
            {error && <div className="error">⚠️ {error}</div>}
            <PredictionForm
              onSubmit={handlePredict}
              loading={loading}
              featureOptions={featureOptions}
            />
          </div>
        );

      case 'analytics':
        return <AnalyticsPage predictions={predictions} modelInfo={modelInfo} />;

      case 'history':
        return <HistoryPage predictions={predictions} />;

      case 'students':
        return <StudentsPage />;

      case 'datasets':
        return <DatasetsPage />;

      case 'models':
        return <ModelsPage modelInfo={modelInfo} />;

      case 'settings':
        return <SettingsPage />;

      default:
        return <HomePage setActiveTab={setActiveTab} modelInfo={modelInfo} />;
    }
  };

  return (
    <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
      <div className="app-layout">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={handleLogout} />

        <main className="main-content">
          <header className="header">
            <div className="header-left">
              <h1>{getPageTitle()}</h1>
              <p>Student Performance Prediction System</p>
            </div>
            <div className="header-right">
              <div className="search-box">
                <span>🔍</span>
                <input type="text" placeholder="Search..." />
              </div>
              <div className="user-profile" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                <div className="user-avatar">
                  {user?.picture ? (
                    <img src={user.picture} alt={user.first_name} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                  ) : (
                    '👤'
                  )}
                </div>
                <div className="user-info">
                  <div className="user-name">{user?.first_name || 'Student'} {user?.last_name || ''}</div>
                  <div className="user-email">{user?.email || 'user@example.com'}</div>
                </div>
              </div>
            </div>
          </header>

          {renderContent()}
        </main>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;

