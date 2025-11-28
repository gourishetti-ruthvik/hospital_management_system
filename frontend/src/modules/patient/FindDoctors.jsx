import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import patientService from '../../services/patientService';
import DashboardLayout from '../../components/layout/DashboardLayout';
import './FindDoctors.css';

const FindDoctors = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDoctors();
  }, []);

  useEffect(() => {
    filterDoctors();
  }, [searchTerm, selectedSpecialization, doctors]);

  const loadDoctors = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await patientService.getAllDoctors();
      // Transform API data to match component format
      const formattedDoctors = data.map(doc => ({
        id: doc.id,
        name: doc.fullName || 'Dr. Unknown',
        specialization: doc.specialization,
        experience: doc.experience || 0,
        rating: 4.5, // Default rating as it's not in the entity
        consultationFee: doc.consultationFee,
        available: doc.available,
        education: doc.qualification || 'MBBS',
        hospital: doc.department || 'General Hospital',
      }));
      setDoctors(formattedDoctors);
    } catch (error) {
      console.error('Error loading doctors:', error);
      setError('Failed to load doctors. Please try again.');
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  const filterDoctors = () => {
    let filtered = doctors;

    // Filter by specialization
    if (selectedSpecialization !== 'all') {
      filtered = filtered.filter(doc => doc.specialization === selectedSpecialization);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDoctors(filtered);
  };

  const specializations = [...new Set(doctors.map(doc => doc.specialization))];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }

    return stars.join('');
  };

  return (
    <DashboardLayout>
      <div className="find-doctors">
      <div className="page-header">
        <div>
          <h1>👨‍⚕️ Find Doctors</h1>
          <p>Search and book appointments with our expert doctors</p>
        </div>
        <button 
          className="back-btn" 
          onClick={() => navigate('/patient/dashboard')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="search-filter-section">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by doctor name or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-box">
          <label>Specialization:</label>
          <select
            value={selectedSpecialization}
            onChange={(e) => setSelectedSpecialization(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Specializations</option>
            {specializations.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="results-info">
        <p>Found <strong>{filteredDoctors.length}</strong> doctors</p>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner">⏳</div>
          <p>Loading doctors...</p>
        </div>
      ) : filteredDoctors.length === 0 ? (
        <div className="empty-state">
          <p>😔 No doctors found matching your criteria</p>
        </div>
      ) : (
        <div className="doctors-grid">
          {filteredDoctors.map(doctor => (
            <div key={doctor.id} className="doctor-card">
              <div className="doctor-card-header">
                <div className="doctor-avatar">
                  {doctor.name.charAt(3).toUpperCase()}
                </div>
                <div className="doctor-basic-info">
                  <h3>{doctor.name}</h3>
                  <p className="specialization">{doctor.specialization}</p>
                  <div className="rating">
                    <span className="stars">{renderStars(doctor.rating)}</span>
                    <span className="rating-value">{doctor.rating}</span>
                  </div>
                </div>
                {doctor.available ? (
                  <span className="available-badge">✅ Available</span>
                ) : (
                  <span className="unavailable-badge">⏰ Busy</span>
                )}
              </div>

              <div className="doctor-card-body">
                <div className="info-item">
                  <span className="info-icon">🎓</span>
                  <span className="info-text">{doctor.education}</span>
                </div>
                <div className="info-item">
                  <span className="info-icon">🏥</span>
                  <span className="info-text">{doctor.hospital}</span>
                </div>
                <div className="info-item">
                  <span className="info-icon">💼</span>
                  <span className="info-text">{doctor.experience} years experience</span>
                </div>
                <div className="info-item">
                  <span className="info-icon">💰</span>
                  <span className="info-text">₹{doctor.consultationFee} consultation fee</span>
                </div>
              </div>

              <div className="doctor-card-footer">
                <button
                  className="btn-view-profile"
                  onClick={() => console.log('View profile:', doctor.id)}
                >
                  👁️ View Profile
                </button>
                <button
                  className="btn-book"
                  onClick={() => navigate('/patient/book-appointment')}
                  disabled={!doctor.available}
                >
                  📅 Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </DashboardLayout>
  );
};

export default FindDoctors;
