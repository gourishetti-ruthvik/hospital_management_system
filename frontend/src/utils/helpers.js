// Utility Helper Functions for Hospital Management System

// Format date to readable string
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Format datetime to readable string
export const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number (10 digits)
export const isValidPhone = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
};

// Capitalize first letter of each word
export const capitalizeWords = (str) => {
  if (!str) return '';
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

// Get user role from token
export const getUserRoleFromToken = (token) => {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || null;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('hms_token');
  return !!token;
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Generate random ID (for temporary use)
export const generateTempId = () => {
  return `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Format currency
export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return 'N/A';
  return `₹${parseFloat(amount).toFixed(2)}`;
};

// Get status badge color
export const getStatusColor = (status) => {
  const statusColors = {
    active: 'success',
    inactive: 'secondary',
    pending: 'warning',
    completed: 'info',
    cancelled: 'danger',
    scheduled: 'primary',
  };
  return statusColors[status?.toLowerCase()] || 'secondary';
};

// Debounce function for search inputs
export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
