import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { APP_CONFIG } from '../../config/appConfig';
import Navigation from '../common/Navigation';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    setApiError('');
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      console.log('=== Login Process Started ===');
      console.log('Form data:', { username: formData.username });
      
      // Use AuthContext login method
      const response = await login(formData);
      
      console.log('Login successful, response:', response);
      
      if (!response || !response.role) {
        throw new Error('Invalid response from server - missing role information');
      }
      
      const { role } = response;
      console.log('User role:', role);

      // Redirect based on role
      if (role === APP_CONFIG.ROLES.ADMIN || role === 'ADMIN') {
        console.log('Navigating to admin dashboard');
        navigate(APP_CONFIG.ROUTES.ADMIN_DASHBOARD, { replace: true });
      } else if (role === APP_CONFIG.ROLES.DOCTOR || role === 'DOCTOR') {
        console.log('Navigating to doctor dashboard');
        navigate(APP_CONFIG.ROUTES.DOCTOR_DASHBOARD, { replace: true });
      } else if (role === APP_CONFIG.ROLES.PATIENT || role === 'PATIENT') {
        console.log('Navigating to patient dashboard');
        navigate(APP_CONFIG.ROUTES.PATIENT_DASHBOARD, { replace: true });
      } else {
        console.log('Unknown role, navigating to home');
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error('=== Login Failed ===');
      console.error('Error object:', error);
      
      // Handle different error scenarios
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.error) {
        errorMessage = error.error;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      setApiError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>🏥 Hospital Management System</h2>
            <p>Sign in to your account</p>
          </div>

        {apiError && (
          <div className="alert alert-danger" role="alert">
            {apiError}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              disabled={loading}
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              disabled={loading}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
