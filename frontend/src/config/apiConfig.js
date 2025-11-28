// API Configuration for Hospital Management System
// Use relative path to leverage nginx proxy in Kubernetes deployment
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

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
    DASHBOARD: `${API_BASE_URL}/api/admin/dashboard`,
    DOCTORS: `${API_BASE_URL}/api/admin`,
    PATIENTS: `${API_BASE_URL}/api/admin`,
    APPOINTMENTS: `${API_BASE_URL}/admin/appointments`,
    REPORTS: `${API_BASE_URL}/admin/reports`,
    BILLING: `${API_BASE_URL}/admin/billing`,
  },
  
  // Doctor endpoints
  DOCTOR: {
    DASHBOARD: `${API_BASE_URL}/api/doctors/dashboard`,
    APPOINTMENTS: `${API_BASE_URL}/api/appointments/doctor`,
    PATIENTS: `${API_BASE_URL}/api/doctors/patients`,
    PRESCRIPTIONS: `${API_BASE_URL}/api/prescriptions/doctor`,
    SCHEDULE: `${API_BASE_URL}/api/doctors/schedule`,
  },

  // Appointment endpoints
  APPOINTMENTS: {
    BASE: `${API_BASE_URL}/api/appointments`,
    PATIENT: `${API_BASE_URL}/api/appointments/patient`,
    DOCTOR: `${API_BASE_URL}/api/appointments/doctor`,
    UPDATE_STATUS: (id) => `${API_BASE_URL}/api/appointments/${id}/status`,
    CANCEL: (id) => `${API_BASE_URL}/api/appointments/${id}`,
  },
  
  // Patient endpoints
  PATIENT: {
    DASHBOARD: `${API_BASE_URL}/patient/dashboard`,
    APPOINTMENTS: `${API_BASE_URL}/api/appointments/patient`,
    DOCTORS: `${API_BASE_URL}/api/doctors`,
    PRESCRIPTIONS: `${API_BASE_URL}/api/prescriptions/patient`,
    PRESCRIPTIONS_ACTIVE: `${API_BASE_URL}/api/prescriptions/patient/active`,
    MEDICAL_RECORDS: `${API_BASE_URL}/api/medical-records/patient`,
    BILLING: `${API_BASE_URL}/patient/billing`,
  },
  
  // Public Doctor endpoints
  DOCTORS: {
    LIST: `${API_BASE_URL}/api/doctors`,
    AVAILABLE: `${API_BASE_URL}/api/doctors/available`,
    SPECIALIZATIONS: `${API_BASE_URL}/api/doctors/specializations`,
  },
};

export default API_BASE_URL;
