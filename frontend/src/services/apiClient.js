import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('hms_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      const { status } = error.response;
      
      if (status === 401) {
        // Unauthorized - Clear token and redirect to login
        localStorage.removeItem('hms_token');
        localStorage.removeItem('hms_user');
        localStorage.removeItem('hms_role');
        window.location.href = '/login';
      } else if (status === 403) {
        // Forbidden - Access denied
        console.error('Access denied');
      } else if (status === 500) {
        // Internal server error
        console.error('Server error. Please try again later.');
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('Network error. Please check your connection.');
    } else {
      // Something else happened
      console.error('An error occurred:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
