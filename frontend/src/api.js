import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const predictGrade = async (studentData) => {
  const response = await api.post('/predict/', studentData);
  return response.data;
};

export const getModelInfo = async () => {
  const response = await api.get('/model-info/');
  return response.data;
};

export const getFeatureOptions = async () => {
  const response = await api.get('/feature-options/');
  return response.data;
};

export const getPredictionHistory = async () => {
  const response = await api.get('/predictions/');
  return response.data;
};

export default api;

