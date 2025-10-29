import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './DoctorPrescriptions.css';

const DoctorPrescriptions = () => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    diagnosis: '',
    medications: '',
    instructions: '',
    followUpDate: '',
  });
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      patientName: 'John Doe',
      diagnosis: 'Viral Fever',
      date: '2024-01-10',
      medications: 'Paracetamol 500mg, Azithromycin 250mg',
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      diagnosis: 'Hypertension',
      date: '2024-01-12',
      medications: 'Amlodipine 5mg, Losartan 50mg',
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newPrescription = {
      id: prescriptions.length + 1,
      patientName: 'New Patient',
      diagnosis: formData.diagnosis,
      date: new Date().toISOString().split('T')[0],
      medications: formData.medications,
    };
    
    setPrescriptions([newPrescription, ...prescriptions]);
    
    // Reset form
    setFormData({
      patientId: '',
      diagnosis: '',
      medications: '',
      instructions: '',
      followUpDate: '',
    });
    setShowForm(false);
    
    console.log('Prescription created:', formData);
    // API call will be added in Phase 3
  };

  return (
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
                  <option value="1">John Doe</option>
                  <option value="2">Jane Smith</option>
                  <option value="3">Robert Johnson</option>
                </select>
              </div>

              <div className="form-group">
                <label>Follow-up Date</label>
                <input
                  type="date"
                  name="followUpDate"
                  value={formData.followUpDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
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
              <label>Medications *</label>
              <textarea
                name="medications"
                value={formData.medications}
                onChange={handleInputChange}
                rows="4"
                placeholder="List medications with dosage (e.g., Paracetamol 500mg - 1 tablet twice daily)"
                required
              />
            </div>

            <div className="form-group">
              <label>Additional Instructions</label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange}
                rows="3"
                placeholder="Any special instructions for the patient"
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
          </div>
        ) : (
          <div className="prescriptions-grid">
            {prescriptions.map(prescription => (
              <div key={prescription.id} className="prescription-card">
                <div className="prescription-header">
                  <div>
                    <h3>{prescription.patientName}</h3>
                    <p className="date">📅 {prescription.date}</p>
                  </div>
                  <div className="prescription-actions">
                    <button className="btn-icon" title="View">👁️</button>
                    <button className="btn-icon" title="Edit">✏️</button>
                    <button className="btn-icon" title="Print">🖨️</button>
                  </div>
                </div>
                
                <div className="prescription-body">
                  <div className="info-row">
                    <strong>Diagnosis:</strong>
                    <span>{prescription.diagnosis}</span>
                  </div>
                  <div className="info-row">
                    <strong>Medications:</strong>
                    <span>{prescription.medications}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorPrescriptions;
