// API Configuration for Hospital Management System
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh`,
  },
  
  // Admin endpoints
  ADMIN: {
    DASHBOARD: `${API_BASE_URL}/admin/dashboard`,
    DOCTORS: `${API_BASE_URL}/admin/doctors`,
    PATIENTS: `${API_BASE_URL}/admin/patients`,
    APPOINTMENTS: `${API_BASE_URL}/admin/appointments`,
    REPORTS: `${API_BASE_URL}/admin/reports`,
    BILLING: `${API_BASE_URL}/admin/billing`,
  },
  
  // Doctor endpoints
  DOCTOR: {
    DASHBOARD: `${API_BASE_URL}/doctor/dashboard`,
    APPOINTMENTS: `${API_BASE_URL}/doctor/appointments`,
    PATIENTS: `${API_BASE_URL}/doctor/patients`,
    PRESCRIPTIONS: `${API_BASE_URL}/doctor/prescriptions`,
    SCHEDULE: `${API_BASE_URL}/doctor/schedule`,
  },
  
  // Patient endpoints
  PATIENT: {
    DASHBOARD: `${API_BASE_URL}/patient/dashboard`,
    APPOINTMENTS: `${API_BASE_URL}/patient/appointments`,
    DOCTORS: `${API_BASE_URL}/patient/doctors`,
    PRESCRIPTIONS: `${API_BASE_URL}/patient/prescriptions`,
    MEDICAL_RECORDS: `${API_BASE_URL}/patient/medical-records`,
    BILLING: `${API_BASE_URL}/patient/billing`,
  },
};

export default API_BASE_URL;
