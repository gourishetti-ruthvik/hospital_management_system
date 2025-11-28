import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

// Create Authentication Context
const AuthContext = createContext(null);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initAuth = () => {
      try {
        const token = authService.isAuthenticated();
        const currentUser = authService.getCurrentUser();
        const currentRole = authService.getCurrentRole();

        // Only set authenticated if we have all required data
        if (token && currentUser && currentRole) {
          setUser(currentUser);
          setRole(currentRole);
          setIsAuthenticated(true);
          console.log('Auth initialized successfully:', { username: currentUser.username, role: currentRole });
        } else {
          // Clear any partial auth data
          if (!token || !currentUser || !currentRole) {
            localStorage.removeItem('hms_token');
            localStorage.removeItem('hms_user');
            localStorage.removeItem('hms_role');
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Clear auth data on error
        localStorage.removeItem('hms_token');
        localStorage.removeItem('hms_user');
        localStorage.removeItem('hms_role');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      console.log('AuthContext: Starting login...');
      const response = await authService.login(credentials);
      
      console.log('AuthContext: Login response received:', response);
      
      // Verify we have all required data
      if (!response.token || !response.user || !response.role) {
        console.error('AuthContext: Invalid response data', response);
        throw new Error('Invalid login response: missing required data');
      }
      
      // Set state
      setUser(response.user);
      setRole(response.role);
      setIsAuthenticated(true);
      
      console.log('AuthContext: State updated - authenticated as', response.role);
      
      return response;
    } catch (error) {
      console.error('AuthContext: Login failed', error);
      // Make sure we're not authenticated on error
      setUser(null);
      setRole(null);
      setIsAuthenticated(false);
      throw error;
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setRole(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Check if user has specific role
  const hasRole = (requiredRole) => {
    return role === requiredRole;
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roles) => {
    return roles.includes(role);
  };

  const value = {
    user,
    role,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    hasRole,
    hasAnyRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
