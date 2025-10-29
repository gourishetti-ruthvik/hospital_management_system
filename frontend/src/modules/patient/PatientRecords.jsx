import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './PatientRecords.css';

const PatientRecords = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('prescriptions');

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = () => {
    setLoading(true);
    // Simulated data - will be replaced with API call in Phase 3
    setTimeout(() => {
      setRecords({
        prescriptions: [
          {
            id: 1,
            doctorName: 'Dr. Sarah Johnson',
            date: '2024-01-10',
            diagnosis: 'Viral Fever',
            medications: 'Paracetamol 500mg - 1 tablet twice daily, Rest',
          },
          {
            id: 2,
            doctorName: 'Dr. Michael Brown',
            date: '2024-01-05',
            diagnosis: 'Skin Allergy',
            medications: 'Cetirizine 10mg - Once daily, Topical cream',
          },
        ],
        appointments: [
          {
            id: 1,
            doctorName: 'Dr. James Wilson',
            date: '2024-01-25',
            time: '11:00 AM',
            status: 'Scheduled',
          },
          {
            id: 2,
            doctorName: 'Dr. Sarah Johnson',
            date: '2024-01-20',
            time: '10:00 AM',
            status: 'Scheduled',
          },
        ],
        labReports: [
          {
            id: 1,
            testName: 'Complete Blood Count',
            date: '2024-01-08',
            status: 'Completed',
            result: 'Normal',
          },
          {
            id: 2,
            testName: 'Lipid Profile',
            date: '2024-01-03',
            status: 'Completed',
            result: 'Borderline High Cholesterol',
          },
        ],
      });
      setLoading(false);
    }, 500);
  };

  return (
    <div className="patient-records">
      <div className="page-header">
        <h1>📋 Medical Records</h1>
        <p>View your complete medical history</p>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'prescriptions' ? 'active' : ''}`}
          onClick={() => setActiveTab('prescriptions')}
        >
          📝 Prescriptions
        </button>
        <button
          className={`tab ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          📅 Appointments
        </button>
        <button
          className={`tab ${activeTab === 'labReports' ? 'active' : ''}`}
          onClick={() => setActiveTab('labReports')}
        >
          🔬 Lab Reports
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'prescriptions' && (
          <div className="records-grid">
            {records.prescriptions?.map(prescription => (
              <div key={prescription.id} className="record-card">
                <div className="record-header">
                  <h3>👨‍⚕️ {prescription.doctorName}</h3>
                  <span className="date">📅 {prescription.date}</span>
                </div>
                <div className="record-body">
                  <div className="info-item">
                    <strong>Diagnosis:</strong>
                    <span>{prescription.diagnosis}</span>
                  </div>
                  <div className="info-item">
                    <strong>Medications:</strong>
                    <span>{prescription.medications}</span>
                  </div>
                </div>
                <div className="record-footer">
                  <button className="btn-download">📥 Download</button>
                  <button className="btn-view">👁️ View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="records-grid">
            {records.appointments?.map(appointment => (
              <div key={appointment.id} className="record-card">
                <div className="record-header">
                  <h3>👨‍⚕️ {appointment.doctorName}</h3>
                  <span className={`status-badge ${appointment.status === 'Scheduled' ? 'blue' : 'green'}`}>
                    {appointment.status}
                  </span>
                </div>
                <div className="record-body">
                  <div className="info-item">
                    <strong>Date:</strong>
                    <span>{appointment.date}</span>
                  </div>
                  <div className="info-item">
                    <strong>Time:</strong>
                    <span>{appointment.time}</span>
                  </div>
                </div>
                <div className="record-footer">
                  <button className="btn-view">👁️ View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'labReports' && (
          <div className="records-grid">
            {records.labReports?.map(report => (
              <div key={report.id} className="record-card">
                <div className="record-header">
                  <h3>🔬 {report.testName}</h3>
                  <span className={`status-badge ${report.status === 'Completed' ? 'green' : 'orange'}`}>
                    {report.status}
                  </span>
                </div>
                <div className="record-body">
                  <div className="info-item">
                    <strong>Date:</strong>
                    <span>{report.date}</span>
                  </div>
                  <div className="info-item">
                    <strong>Result:</strong>
                    <span>{report.result}</span>
                  </div>
                </div>
                <div className="record-footer">
                  <button className="btn-download">📥 Download Report</button>
                  <button className="btn-view">👁️ View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientRecords;
