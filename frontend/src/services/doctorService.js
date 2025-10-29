import apiClient from './apiClient';
import { API_ENDPOINTS } from '../config/apiConfig';

// Doctor Service
const doctorService = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.DOCTOR.DASHBOARD);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch dashboard stats' };
    }
  },

  // Appointment Management
  getMyAppointments: async (filters) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.DOCTOR.APPOINTMENTS, { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch appointments' };
    }
  },

  getAppointmentById: async (id) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.DOCTOR.APPOINTMENTS}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch appointment details' };
    }
  },

  updateAppointmentStatus: async (id, status, notes) => {
    try {
      const response = await apiClient.patch(`${API_ENDPOINTS.DOCTOR.APPOINTMENTS}/${id}/status`, {
        status,
        notes,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update appointment' };
    }
  },

  // Patient Management
  getMyPatients: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.DOCTOR.PATIENTS);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch patients' };
    }
  },

  getPatientDetails: async (id) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.DOCTOR.PATIENTS}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch patient details' };
    }
  },

  // Prescription Management
  getPrescriptions: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.DOCTOR.PRESCRIPTIONS);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch prescriptions' };
    }
  },

  createPrescription: async (prescriptionData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.DOCTOR.PRESCRIPTIONS, prescriptionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create prescription' };
    }
  },

  updatePrescription: async (id, prescriptionData) => {
    try {
      const response = await apiClient.put(`${API_ENDPOINTS.DOCTOR.PRESCRIPTIONS}/${id}`, prescriptionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update prescription' };
    }
  },

  // Schedule Management
  getMySchedule: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.DOCTOR.SCHEDULE);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch schedule' };
    }
  },

  updateSchedule: async (scheduleData) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.DOCTOR.SCHEDULE, scheduleData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update schedule' };
    }
  },

  // Add consultation notes
  addConsultationNotes: async (appointmentId, notes) => {
    try {
      const response = await apiClient.post(`${API_ENDPOINTS.DOCTOR.APPOINTMENTS}/${appointmentId}/notes`, {
        notes,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to add consultation notes' };
    }
  },
};

export default doctorService;
