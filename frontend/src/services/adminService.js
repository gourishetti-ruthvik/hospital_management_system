import apiClient from './apiClient';
import { API_ENDPOINTS } from '../config/apiConfig';

// Admin Service
const adminService = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ADMIN.DASHBOARD);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch dashboard stats' };
    }
  },

  // Doctor Management
  getAllDoctors: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ADMIN.DOCTORS);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch doctors' };
    }
  },

  getDoctorById: async (id) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.ADMIN.DOCTORS}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch doctor details' };
    }
  },

  createDoctor: async (doctorData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.ADMIN.DOCTORS, doctorData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create doctor' };
    }
  },

  updateDoctor: async (id, doctorData) => {
    try {
      const response = await apiClient.put(`${API_ENDPOINTS.ADMIN.DOCTORS}/${id}`, doctorData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update doctor' };
    }
  },

  deleteDoctor: async (id) => {
    try {
      const response = await apiClient.delete(`${API_ENDPOINTS.ADMIN.DOCTORS}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete doctor' };
    }
  },

  // Patient Management
  getAllPatients: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ADMIN.PATIENTS);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch patients' };
    }
  },

  getPatientById: async (id) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.ADMIN.PATIENTS}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch patient details' };
    }
  },

  updatePatient: async (id, patientData) => {
    try {
      const response = await apiClient.put(`${API_ENDPOINTS.ADMIN.PATIENTS}/${id}`, patientData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update patient' };
    }
  },

  deletePatient: async (id) => {
    try {
      const response = await apiClient.delete(`${API_ENDPOINTS.ADMIN.PATIENTS}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete patient' };
    }
  },

  // Appointment Management
  getAllAppointments: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ADMIN.APPOINTMENTS);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch appointments' };
    }
  },

  updateAppointmentStatus: async (id, status) => {
    try {
      const response = await apiClient.patch(`${API_ENDPOINTS.ADMIN.APPOINTMENTS}/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update appointment status' };
    }
  },

  // Reports
  getReports: async (filters) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ADMIN.REPORTS, { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch reports' };
    }
  },

  // Billing
  getAllBillings: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ADMIN.BILLING);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch billing records' };
    }
  },
};

export default adminService;
