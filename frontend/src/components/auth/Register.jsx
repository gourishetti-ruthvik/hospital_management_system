import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/apiConfig';
import Navigation from '../common/Navigation';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: '',
    role: 'PATIENT', // Default role
    phoneNumber: '',
    address: '',
    // Doctor-specific fields
    specialization: '',
    licenseNumber: '',
    yearsOfExperience: '',
    qualification: '',
    bio: '',
    consultationFee: '',
    department: '',
    // Patient-specific fields
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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
    } else {
      const ageNum = parseInt(formData.age);
      if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
        newErrors.age = 'Age must be between 1 and 120';
      }
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Role-specific validation
    if (formData.role === 'DOCTOR') {
      if (!formData.specialization.trim()) {
        newErrors.specialization = 'Specialization is required for doctors';
      }
      if (!formData.licenseNumber.trim()) {
        newErrors.licenseNumber = 'License number is required for doctors';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Prepare registration data
      const registerData = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        age: parseInt(formData.age),
        password: formData.password,
        role: formData.role,
        phoneNumber: formData.phoneNumber || null,
        address: formData.address || null,
      };

      // Add doctor-specific fields
      if (formData.role === 'DOCTOR') {
        registerData.specialization = formData.specialization;
        registerData.licenseNumber = formData.licenseNumber;
        registerData.yearsOfExperience = formData.yearsOfExperience ? parseInt(formData.yearsOfExperience) : 0;
        registerData.qualification = formData.qualification || null;
        registerData.bio = formData.bio || null;
        registerData.consultationFee = formData.consultationFee ? parseFloat(formData.consultationFee) : 500;
        registerData.department = formData.department || 'General';
      }

      // Add patient-specific fields
      if (formData.role === 'PATIENT') {
        registerData.dateOfBirth = formData.dateOfBirth || null;
        registerData.gender = formData.gender || null;
        registerData.bloodGroup = formData.bloodGroup || null;
        registerData.emergencyContactName = formData.emergencyContactName || null;
        registerData.emergencyContactPhone = formData.emergencyContactPhone || null;
      }
      
      console.log('Sending registration data:', registerData);
      
      const response = await axios.post(
        API_ENDPOINTS.AUTH.REGISTER,
        registerData
      );
      
      console.log('Registration response:', response.data);
      
      setSuccessMessage(response.data.message || 'Registration successful! Redirecting to login...');
      
      // Clear form on success
      setFormData({
        name: '',
        username: '',
        email: '',
        age: '',
        password: '',
        confirmPassword: '',
        role: 'PATIENT',
        phoneNumber: '',
        address: '',
        specialization: '',
        licenseNumber: '',
        yearsOfExperience: '',
        qualification: '',
        bio: '',
        consultationFee: '',
        department: '',
        dateOfBirth: '',
        gender: '',
        bloodGroup: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
      });
      
      // Only redirect after successful registration
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle different error scenarios
      if (error.response) {
        // Server responded with error
        const errorMessage = error.response.data.message || error.response.data || 'Registration failed';
        setApiError(errorMessage);
      } else if (error.request) {
        // Request made but no response
        setApiError('Cannot connect to server. Please check if the backend is running.');
      } else {
        // Other errors
        setApiError(error.message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>🏥 Create Account</h2>
            <p>Register for Hospital Management System</p>
          </div>

        {apiError && (
          <div className="alert alert-danger" role="alert">
            {apiError}
          </div>
        )}

        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Role Selection */}
          <div className="form-group">
            <label htmlFor="role">Register As *</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={loading}
              className="form-control"
            >
              <option value="PATIENT">Patient</option>
              <option value="DOCTOR">Doctor</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {/* Basic Information */}
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              disabled={loading}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="username">Username *</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username (min 3 characters)"
              disabled={loading}
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              disabled={loading}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="age">Age *</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age (1-120)"
              min="1"
              max="120"
              disabled={loading}
            />
            {errors.age && <span className="error-text">{errors.age}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              disabled={loading}
            />
          </div>

          {/* Doctor-specific fields */}
          {formData.role === 'DOCTOR' && (
            <>
              <div className="form-group">
                <label htmlFor="specialization">Specialization *</label>
                <input
                  type="text"
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  placeholder="e.g., Cardiology, Dermatology"
                  disabled={loading}
                />
                {errors.specialization && <span className="error-text">{errors.specialization}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="licenseNumber">License Number *</label>
                <input
                  type="text"
                  id="licenseNumber"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  placeholder="Medical license number"
                  disabled={loading}
                />
                {errors.licenseNumber && <span className="error-text">{errors.licenseNumber}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="yearsOfExperience">Years of Experience</label>
                <input
                  type="number"
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  placeholder="Years of experience"
                  min="0"
                  max="50"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="qualification">Qualification</label>
                <input
                  type="text"
                  id="qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  placeholder="e.g., MBBS, MD"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="department">Department</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Department"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="consultationFee">Consultation Fee</label>
                <input
                  type="number"
                  id="consultationFee"
                  name="consultationFee"
                  value={formData.consultationFee}
                  onChange={handleChange}
                  placeholder="Consultation fee"
                  min="0"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Brief professional bio"
                  rows="3"
                  disabled={loading}
                />
              </div>
            </>
          )}

          {/* Patient-specific fields */}
          {formData.role === 'PATIENT' && (
            <>
              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="bloodGroup">Blood Group</label>
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="emergencyContactName">Emergency Contact Name</label>
                <input
                  type="text"
                  id="emergencyContactName"
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                  placeholder="Emergency contact name"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="emergencyContactPhone">Emergency Contact Phone</label>
                <input
                  type="tel"
                  id="emergencyContactPhone"
                  name="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={handleChange}
                  placeholder="Emergency contact phone"
                  disabled={loading}
                />
              </div>
            </>
          )}

          {/* Password Fields */}
          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              disabled={loading}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              disabled={loading}
            />
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div className="auth-link">
          Already have an account? <Link to="/login">Sign in here</Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;
