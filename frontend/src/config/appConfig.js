// Application Configuration
export const APP_CONFIG = {
  APP_NAME: 'Hospital Management System',
  VERSION: '1.0.0',
  
  // Role definitions
  ROLES: {
    ADMIN: 'ADMIN',
    DOCTOR: 'DOCTOR',
    PATIENT: 'PATIENT',
  },
  
  // Route paths
  ROUTES: {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    ADMIN_DASHBOARD: '/admin/dashboard',
    DOCTOR_DASHBOARD: '/doctor/dashboard',
    PATIENT_DASHBOARD: '/patient/dashboard',
  },
  
  // Local storage keys
  STORAGE_KEYS: {
    TOKEN: 'hms_token',
    USER: 'hms_user',
    ROLE: 'hms_role',
  },
  
  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
  },
  
  // Date format
  DATE_FORMAT: 'YYYY-MM-DD',
  DATETIME_FORMAT: 'YYYY-MM-DD HH:mm:ss',
};

export default APP_CONFIG;
