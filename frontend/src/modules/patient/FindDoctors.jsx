import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './FindDoctors.css';

const FindDoctors = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDoctors();
  }, []);

  useEffect(() => {
    filterDoctors();
  }, [searchTerm, selectedSpecialization, doctors]);

  const loadDoctors = () => {
    setLoading(true);
    // Simulated data - will be replaced with API call in Phase 3
    setTimeout(() => {
      setDoctors([
        {
          id: 1,
          name: 'Dr. Sarah Johnson',
          specialization: 'Cardiology',
          experience: 15,
          rating: 4.8,
          consultationFee: 500,
          available: true,
          education: 'MBBS, MD - Cardiology',
          hospital: 'City Medical Center',
        },
        {
          id: 2,
          name: 'Dr. Michael Brown',
          specialization: 'Dermatology',
          experience: 10,
          rating: 4.6,
          consultationFee: 400,
          available: true,
          education: 'MBBS, MD - Dermatology',
          hospital: 'Skin Care Clinic',
        },
        {
          id: 3,
          name: 'Dr. Emily Davis',
          specialization: 'Pediatrics',
          experience: 12,
          rating: 4.9,
          consultationFee: 450,
          available: false,
          education: 'MBBS, MD - Pediatrics',
          hospital: 'Children Hospital',
        },
        {
          id: 4,
          name: 'Dr. James Wilson',
          specialization: 'Orthopedics',
          experience: 20,
          rating: 4.7,
          consultationFee: 600,
          available: true,
          education: 'MBBS, MS - Orthopedics',
          hospital: 'Bone & Joint Center',
        },
        {
          id: 5,
          name: 'Dr. Lisa Anderson',
          specialization: 'Neurology',
          experience: 18,
          rating: 4.8,
          consultationFee: 700,
          available: true,
          education: 'MBBS, DM - Neurology',
          hospital: 'Neuro Care Hospital',
        },
        {
          id: 6,
          name: 'Dr. Robert Martinez',
          specialization: 'Cardiology',
          experience: 14,
          rating: 4.5,
          consultationFee: 550,
          available: true,
          education: 'MBBS, MD - Cardiology',
          hospital: 'Heart Institute',
        },
      ]);
      setLoading(false);
    }, 500);
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
    <div className="find-doctors">
      <div className="page-header">
        <h1>👨‍⚕️ Find Doctors</h1>
        <p>Search and book appointments with our expert doctors</p>
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
  );
};

export default FindDoctors;
