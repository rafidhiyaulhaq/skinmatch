import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL || 'https://skinmatch.up.railway.app';

const handleApiError = (error) => {
  if (error.response) {
    return {
      message: error.response.data.message || 'Server error occurred',
      status: error.response.status
    };
  } else if (error.request) {
    return { 
      message: 'Network error. Please check your connection.',
      status: 0 
    };
  }
  return { 
    message: 'An unexpected error occurred',
    status: 500 
  };
};

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(handleApiError(error));
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorData = handleApiError(error);
    
    if (errorData.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      toast.error('Session expired. Please login again.');
    } else {
      toast.error(errorData.message);
    }
    
    return Promise.reject(errorData);
  }
);

// Auth services
export const authService = {
  register: async (data) => {
    try {
      const response = await api.post('/api/auth/register', data);
      toast.success('Registration successful!');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  login: async (data) => {
    try {
      const response = await api.post('/api/auth/login', data);
      toast.success('Login successful!');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get('/api/auth/profile');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateProfile: async (data) => {
    try {
      const response = await api.put('/api/auth/profile', data);
      toast.success('Profile updated successfully!');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Quiz services
export const quizService = {
  submitQuiz: async (data) => {
    try {
      const response = await api.post('/api/quiz/submit', data);
      toast.success('Quiz submitted successfully!');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getHistory: async () => {
    try {
      const response = await api.get('/api/quiz/history');
      return response.data;
    } catch (error) {
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
      throw error;
    }
  },

  getProducts: async () => {
    try {
      const response = await api.get('/api/products');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default api;