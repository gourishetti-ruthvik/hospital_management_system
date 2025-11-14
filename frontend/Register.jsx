import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    setApiError('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (formData.age < 1 || formData.age > 120) {
      newErrors.age = 'Please enter a valid age';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      
      setSuccessMessage('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setApiError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=\"auth-container\">
      <div className=\"auth-card\">
        <div className=\"auth-header\">
          <h2> Create Account</h2>
          <p>Register for Hospital Management System</p>
        </div>

        {apiError && (
          <div className=\"alert alert-danger\" role=\"alert\">
            {apiError}
          </div>
        )}

        {successMessage && (
          <div className=\"alert alert-success\" role=\"alert\">
            {successMessage}
          </div>
        )}

        <form className=\"auth-form\" onSubmit={handleSubmit}>
          <div className=\"form-group\">
            <label htmlFor=\"name\">Name</label>
            <input
              type=\"text\"
              id=\"name\"
              name=\"name\"
              value={formData.name}
              onChange={handleChange}
              placeholder=\"Enter your full name\"
              disabled={loading}
            />
            {errors.name && <span className=\"error-text\">{errors.name}</span>}
          </div>

          <div className=\"form-group\">
            <label htmlFor=\"username\">Username</label>
            <input
              type=\"text\"
              id=\"username\"
              name=\"username\"
              value={formData.username}
              onChange={handleChange}
              placeholder=\"Enter username (min 3 characters)\"
              disabled={loading}
            />
            {errors.username && <span className=\"error-text\">{errors.username}</span>}
          </div>

          <div className=\"form-group\">
            <label htmlFor=\"email\">Email</label>
            <input
              type=\"email\"
              id=\"email\"
              name=\"email\"
              value={formData.email}
              onChange={handleChange}
              placeholder=\"Enter your email\"
              disabled={loading}
            />
            {errors.email && <span className=\"error-text\">{errors.email}</span>}
          </div>

          <div className=\"form-group\">
            <label htmlFor=\"age\">Age</label>
            <input
              type=\"number\"
              id=\"age\"
              name=\"age\"
              value={formData.age}
              onChange={handleChange}
              placeholder=\"Enter your age\"
              min=\"1\"
              max=\"120\"
              disabled={loading}
            />
            {errors.age && <span className=\"error-text\">{errors.age}</span>}
          </div>

          <div className=\"form-group\">
            <label htmlFor=\"password\">Password</label>
            <input
              type=\"password\"
              id=\"password\"
              name=\"password\"
              value={formData.password}
              onChange={handleChange}
              placeholder=\"At least 6 characters\"
              disabled={loading}
            />
            {errors.password && <span className=\"error-text\">{errors.password}</span>}
          </div>

          <div className=\"form-group\">
            <label htmlFor=\"confirmPassword\">Confirm Password</label>
            <input
              type=\"password\"
              id=\"confirmPassword\"
              name=\"confirmPassword\"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder=\"Re-enter password\"
              disabled={loading}
            />
            {errors.confirmPassword && <span className=\"error-text\">{errors.confirmPassword}</span>}
          </div>

          <button type=\"submit\" className=\"auth-btn\" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div className=\"auth-link\">
          Already have an account? <Link to=\"/login\">Sign in here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
