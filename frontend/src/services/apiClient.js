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
      console.log('Request with token:', config.url);
    } else {
      console.log('Request without token:', config.url);
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Track if we're already redirecting to prevent loops
let isRedirecting = false;

// Response interceptor - Handle common errors
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error('API Error:', error.config?.url, error.response?.status, error.message);
    
    if (error.response) {
      // Server responded with error status
      const { status, config } = error.response;
      
      if (status === 401) {
        // Only redirect to login if this is not a login/register request
        const isAuthRequest = config.url.includes('/auth/');
        const currentPath = window.location.pathname;
        const isPublicPath = currentPath === '/login' || currentPath === '/register' || currentPath === '/' || currentPath === '/about' || currentPath === '/contact';
        
        // Don't logout if we're trying to login or on public pages
        // Also check if we actually have a token - if no token, user should be on login page anyway
        const hasToken = localStorage.getItem('hms_token');
        
        if (!isAuthRequest && !isPublicPath && hasToken && !isRedirecting) {
          console.warn('Session expired or invalid - user will be logged out');
          isRedirecting = true;
          
          // Wait a bit before clearing and redirecting to allow current request to complete
          setTimeout(() => {
            // Clear auth data
            localStorage.removeItem('hms_token');
            localStorage.removeItem('hms_user');
            localStorage.removeItem('hms_role');
            
            // Redirect to login
            window.location.href = '/login?session=expired';
            
            // Reset flag after redirect
            setTimeout(() => {
              isRedirecting = false;
            }, 1000);
          }, 500);
        }
      } else if (status === 403) {
        console.error('Access denied - insufficient permissions');
      } else if (status === 500) {
        console.error('Server error - please try again later');
      }
    } else if (error.request) {
      console.error('Network error - no response from server');
    } else {
      console.error('Request error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
