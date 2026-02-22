import { useState, useEffect } from 'react';
import GoogleAuthButton from './GoogleAuthButton';

export default function LoginPage({ onLoginSuccess }) {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      if (onLoginSuccess) {
        onLoginSuccess(JSON.parse(storedUser));
      }
    }
  }, []);

  const handleLoginSuccess = (data) => {
    setUser(data.user);
    setError(null);
    if (onLoginSuccess) {
      onLoginSuccess(data);
    }
  };

  const handleLoginError = (error) => {
    setError(error.message || 'Login failed. Please try again.');
  };

  if (user) {
    return null; // User is logged in, don't show login page
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="logo">
            <span className="logo-icon">🎓</span>
            <h1>Student AI</h1>
          </div>
          <h2>Welcome Back!</h2>
          <p>Sign in to continue to Student Performance Predictor</p>
        </div>

        <div className="login-content">
          {error && (
            <div className="error-message">
              <span>⚠️</span> {error}
            </div>
          )}

          <div className="login-button-container">
            <GoogleAuthButton
              onLoginSuccess={handleLoginSuccess}
              onLoginError={handleLoginError}
            />
          </div>

          <div className="login-footer">
            <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .login-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
        }

        .login-container {
          background: white;
          border-radius: 20px;
          padding: 40px;
          max-width: 450px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .login-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .logo-icon {
          font-size: 40px;
        }

        .logo h1 {
          font-size: 32px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
        }

        .login-header h2 {
          font-size: 28px;
          color: #333;
          margin: 0 0 10px 0;
        }

        .login-header p {
          color: #666;
          font-size: 14px;
        }

        .login-content {
          margin-bottom: 20px;
        }

        .error-message {
          background: #fee;
          border: 1px solid #fcc;
          color: #c33;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .login-button-container {
          display: flex;
          justify-content: center;
          margin: 30px 0;
        }

        .login-footer {
          text-align: center;
          margin-top: 30px;
        }

        .login-footer p {
          font-size: 12px;
          color: #999;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
