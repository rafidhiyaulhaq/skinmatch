import axios from 'axios';

const API_URL = 'https://skinmatch.up.railway.app';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth services
export const authService = {
  login: (data) => api.post('/api/auth/login', data),
  register: (data) => api.post('/api/auth/register', data),
};

// Quiz services
export const quizService = {
  submitQuiz: (data) => api.post('/api/quiz/submit', data),
  getHistory: () => api.get('/api/quiz/history'),
};

// Product services
export const productService = {
  getRecommendations: (skinType) => api.get(`/api/products/recommendations?skinType=${skinType}`),
  getProducts: () => api.get('/api/products'),
};

export default api;