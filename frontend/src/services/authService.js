import apiClient from './apiClient';
import { API_ENDPOINTS } from '../config/apiConfig';
import { APP_CONFIG } from '../config/appConfig';

// Authentication Service
const authService = {
  // User login
  login: async (credentials) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      const { token, user, role } = response.data;
      
      // Store authentication data in localStorage
      localStorage.setItem(APP_CONFIG.STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(APP_CONFIG.STORAGE_KEYS.USER, JSON.stringify(user));
      localStorage.setItem(APP_CONFIG.STORAGE_KEYS.ROLE, role);
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  // User registration
  register: async (userData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  // User logout
  logout: async () => {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage regardless of API response
      localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.TOKEN);
      localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.USER);
      localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.ROLE);
    }
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const userStr = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.USER);
    return userStr ? JSON.parse(userStr) : null;
  },

  // Get current user role
  getCurrentRole: () => {
    return localStorage.getItem(APP_CONFIG.STORAGE_KEYS.ROLE);
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.TOKEN);
    return !!token;
  },

  // Refresh authentication token
  refreshToken: async () => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN);
      const { token } = response.data;
      localStorage.setItem(APP_CONFIG.STORAGE_KEYS.TOKEN, token);
      return token;
    } catch (error) {
      throw error.response?.data || { message: 'Token refresh failed' };
    }
  },
};

export default authService;
