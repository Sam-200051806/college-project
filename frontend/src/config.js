// Environment configuration
export const config = {
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
};
