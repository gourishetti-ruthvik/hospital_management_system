import apiClient from './apiClient';
import { API_ENDPOINTS } from '../config/apiConfig';

// Patient Service
const patientService = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PATIENT.DASHBOARD);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch dashboard stats' };
    }
  },

  // Appointment Management
  getMyAppointments: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PATIENT.APPOINTMENTS);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch appointments' };
    }
  },

  bookAppointment: async (appointmentData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.PATIENT.APPOINTMENTS, appointmentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to book appointment' };
    }
  },

  cancelAppointment: async (id) => {
    try {
      const response = await apiClient.delete(`${API_ENDPOINTS.PATIENT.APPOINTMENTS}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to cancel appointment' };
    }
  },

  rescheduleAppointment: async (id, newDateTime) => {
    try {
      const response = await apiClient.patch(`${API_ENDPOINTS.PATIENT.APPOINTMENTS}/${id}/reschedule`, {
        dateTime: newDateTime,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to reschedule appointment' };
    }
  },

  // Doctor Search and Discovery
  getAllDoctors: async (filters) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PATIENT.DOCTORS, { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch doctors' };
    }
  },

  getDoctorById: async (id) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.PATIENT.DOCTORS}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch doctor details' };
    }
  },

  getDoctorAvailability: async (doctorId, date) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.PATIENT.DOCTORS}/${doctorId}/availability`, {
        params: { date },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch doctor availability' };
    }
  },

  // Prescription Management
  getMyPrescriptions: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PATIENT.PRESCRIPTIONS);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch prescriptions' };
    }
  },

  getPrescriptionById: async (id) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.PATIENT.PRESCRIPTIONS}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch prescription details' };
    }
  },

  // Medical Records
  getMyMedicalRecords: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PATIENT.MEDICAL_RECORDS);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch medical records' };
    }
  },

  getMedicalRecordById: async (id) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.PATIENT.MEDICAL_RECORDS}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch medical record details' };
    }
  },

  // Billing
  getMyBillings: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PATIENT.BILLING);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch billing records' };
    }
  },

  getBillingById: async (id) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.PATIENT.BILLING}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch billing details' };
    }
  },

  makePayment: async (billingId, paymentData) => {
    try {
      const response = await apiClient.post(`${API_ENDPOINTS.PATIENT.BILLING}/${billingId}/payment`, paymentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to process payment' };
    }
  },
};

export default patientService;
