import axios from 'axios';

const API_URL = 'https://skinmatch.up.railway.app';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  register: async (data) => {
    try {
      const response = await api.post('/api/auth/register', data);
      return response.data;
    } catch (error) {
      console.error('Register error:', error.response?.data || error.message);
      throw error;
    }
  },
  login: async (data) => {
    try {
      const response = await api.post('/api/auth/login', data);
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  },
  getProfile: async () => {
    try {
      const response = await api.get('/api/auth/profile');
      return response.data;
    } catch (error) {
      console.error('Get profile error:', error.response?.data || error.message);
      throw error;
    }
  },
  updateProfile: async (data) => {
    try {
      const response = await api.put('/api/auth/profile', data);
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error.response?.data || error.message);
      throw error;
    }
  }
};

// Quiz services dan Product services tetap sama...

// Quiz services
export const quizService = {
 submitQuiz: async (data) => {
   try {
     const response = await api.post('/api/quiz/submit', data);
     return response.data;
   } catch (error) {
     console.error('Submit quiz error:', error.response?.data || error.message);
     throw error;
   }
 },
 getHistory: async () => {
   try {
     const response = await api.get('/api/quiz/history');
     return response.data;
   } catch (error) {
     console.error('Get history error:', error.response?.data || error.message);
     throw error;
   }
 }
};

// Product services
export const productService = {
 getRecommendations: async (skinType) => {
   try {
     const response = await api.get(`/api/products/recommendations?skinType=${skinType}`);
     return response.data;
   } catch (error) {
     console.error('Get recommendations error:', error.response?.data || error.message);
     throw error;
   }
 },
 getProducts: async () => {
   try {
     const response = await api.get('/api/products');
     return response.data;
   } catch (error) {
     console.error('Get products error:', error.response?.data || error.message);
     throw error;
   }
 }
};

export default api;