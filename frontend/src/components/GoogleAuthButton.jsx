import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { config } from '../config';

export default function GoogleAuthButton({ onLoginSuccess, onLoginError }) {
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const response = await axios.post(
        `${config.API_URL}/auth/google/`,
        { credential: credentialResponse.credential },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { user, tokens, picture } = response.data;

      // Store tokens in localStorage
      localStorage.setItem('accessToken', tokens.access);
      localStorage.setItem('refreshToken', tokens.refresh);
      localStorage.setItem('user', JSON.stringify({ ...user, picture }));

      // Call success callback
      if (onLoginSuccess) {
        onLoginSuccess({ user, tokens, picture });
      }
    } catch (error) {
      console.error('Login failed:', error);
      if (onLoginError) {
        onLoginError(error);
      }
    }
  };

  return (
    <div className="google-login-button">
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => {
          console.error('Google Login Failed');
          if (onLoginError) {
            onLoginError(new Error('Google Login Failed'));
          }
        }}
        useOneTap
        theme="filled_blue"
        size="large"
        text="signin_with"
        shape="rectangular"
      />
    </div>
  );
}
