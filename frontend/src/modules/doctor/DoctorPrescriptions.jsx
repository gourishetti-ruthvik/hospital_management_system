import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { API_ENDPOINTS } from '../../config/apiConfig';
import apiClient from '../../services/apiClient';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import DashboardLayout from '../../components/layout/DashboardLayout';
import './DoctorPrescriptions.css';

const DoctorPrescriptions = () => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patientId: '',
    diagnosis: '',
    medicationName: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: '',
    active: true,
  });
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    loadPrescriptions();
    loadPatients();
  }, []);

  const loadPrescriptions = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(API_ENDPOINTS.APPOINTMENTS.DOCTOR);
      const appointments = Array.isArray(response.data) ? response.data : [];
      
      // Get unique patients from appointments
      const uniquePatients = appointments
        .filter(apt => apt.patient)
        .map(apt => apt.patient)
        .filter((patient, index, self) => 
          index === self.findIndex(p => p.id === patient.id)
        );
      
      setPatients(uniquePatients);

      const prescResponse = await apiClient.get(`${API_ENDPOINTS.APPOINTMENTS.BASE.replace('/appointments', '')}/prescriptions/doctor`);
      setPrescriptions(Array.isArray(prescResponse.data) ? prescResponse.data : []);
    } catch (error) {
      console.error('Error loading prescriptions:', error);
      setPrescriptions([]);
    } finally {
      setLoading(false);
    }
  };

  const loadPatients = async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.APPOINTMENTS.DOCTOR);
      const appointments = Array.isArray(response.data) ? response.data : [];
      const uniquePatients = appointments
        .filter(apt => apt.patient)
        .map(apt => apt.patient)
        .filter((patient, index, self) => 
          index === self.findIndex(p => p.id === patient.id)
        );
      setPatients(uniquePatients);
    } catch (error) {
      console.error('Error loading patients:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const prescriptionData = {
        patient: { id: parseInt(formData.patientId) },
        diagnosis: formData.diagnosis,
        medicationName: formData.medicationName,
        dosage: formData.dosage,
        frequency: formData.frequency,
        duration: formData.duration,
        instructions: formData.instructions,
        active: formData.active,
      };

      await apiClient.post(`${API_ENDPOINTS.APPOINTMENTS.BASE.replace('/appointments', '')}/prescriptions`, prescriptionData);
      
      // Reset form
      setFormData({
        patientId: '',
        diagnosis: '',
        medicationName: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: '',
        active: true,
      });
      setShowForm(false);
      
      // Reload prescriptions
      loadPrescriptions();
      alert('Prescription created successfully!');
    } catch (error) {
      console.error('Error creating prescription:', error);
      alert('Failed to create prescription');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner message="Loading prescriptions..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="doctor-prescriptions">
      <div className="page-header">
        <h1>📝 Prescriptions</h1>
        <button className="btn-new" onClick={() => setShowForm(!showForm)}>
          {showForm ? '❌ Cancel' : '➕ New Prescription'}
        </button>
      </div>

      {showForm && (
        <div className="prescription-form-card">
          <h2>Create New Prescription</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Patient *</label>
                <select
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">-- Select Patient --</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>
                      {patient.user?.fullName || patient.user?.username}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Medication Name *</label>
                <input
                  type="text"
                  name="medicationName"
                  value={formData.medicationName}
                  onChange={handleInputChange}
                  placeholder="e.g., Paracetamol"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Dosage *</label>
                <input
                  type="text"
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleInputChange}
                  placeholder="e.g., 500mg"
                  required
                />
              </div>

              <div className="form-group">
                <label>Frequency *</label>
                <input
                  type="text"
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleInputChange}
                  placeholder="e.g., Twice daily"
                  required
                />
              </div>

              <div className="form-group">
                <label>Duration *</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="e.g., 7 days"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Diagnosis *</label>
              <input
                type="text"
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleInputChange}
                placeholder="Enter diagnosis"
                required
              />
            </div>

            <div className="form-group">
              <label>Instructions</label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange}
                rows="3"
                placeholder="Additional instructions for the patient"
              />
            </div>

            <button type="submit" className="btn-submit">
              💾 Create Prescription
            </button>
          </form>
        </div>
      )}

      <div className="prescriptions-list">
        <h2>Recent Prescriptions</h2>
        
        {prescriptions.length === 0 ? (
          <div className="empty-state">
            <p>📋 No prescriptions found</p>
            <p>Create your first prescription using the button above</p>
          </div>
        ) : (
          <div className="prescriptions-grid">
            {prescriptions.map(prescription => (
              <div key={prescription.id} className="prescription-card">
                <div className="prescription-header">
                  <div>
                    <h3>👤 {prescription.patient?.user?.fullName || prescription.patient?.user?.username || 'Unknown Patient'}</h3>
                    <p className="date">📅 {formatDate(prescription.prescriptionDate)}</p>
                  </div>
                  <span className={`status-badge ${prescription.active ? 'active' : 'inactive'}`}>
                    {prescription.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <div className="prescription-body">
                  <div className="info-row">
                    <strong>Medication:</strong>
                    <span>{prescription.medicationName}</span>
                  </div>
                  <div className="info-row">
                    <strong>Dosage:</strong>
                    <span>{prescription.dosage}</span>
                  </div>
                  <div className="info-row">
                    <strong>Frequency:</strong>
                    <span>{prescription.frequency}</span>
                  </div>
                  <div className="info-row">
                    <strong>Duration:</strong>
                    <span>{prescription.duration}</span>
                  </div>
                  {prescription.diagnosis && (
                    <div className="info-row">
                      <strong>Diagnosis:</strong>
                      <span>{prescription.diagnosis}</span>
                    </div>
                  )}
                  {prescription.instructions && (
                    <div className="info-row">
                      <strong>Instructions:</strong>
                      <span>{prescription.instructions}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </DashboardLayout>
  );
};

export default DoctorPrescriptions;
