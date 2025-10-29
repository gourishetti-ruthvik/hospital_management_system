import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './UserProfile.css';

const UserProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: '+1234567890',
    address: '123 Main Street, City, State',
    dateOfBirth: '1990-01-01',
    bloodGroup: 'O+',
    emergencyContact: '+1234567899',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    
    setMessage({ type: 'success', text: 'Profile updated successfully!' });
    setIsEditing(false);
    
    console.log('Profile updated:', formData);
    // API call will be added in Phase 3
    
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match!' });
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters!' });
      return;
    }
    
    setMessage({ type: 'success', text: 'Password changed successfully!' });
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    
    console.log('Password changed');
    // API call will be added in Phase 3
    
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const getRoleBadgeClass = (role) => {
    const roleMap = {
      ADMIN: 'admin-badge',
      DOCTOR: 'doctor-badge',
      PATIENT: 'patient-badge',
    };
    return roleMap[role] || 'patient-badge';
  };

  return (
    <div className="user-profile">
      <div className="page-header">
        <h1>👤 My Profile</h1>
        <p>Manage your account information</p>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="profile-container">
        {/* Profile Information Card */}
        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar">
              {formData.name.charAt(0).toUpperCase()}
            </div>
            <div className="profile-info">
              <h2>{formData.name}</h2>
              <p>{formData.email}</p>
              <span className={`role-badge ${getRoleBadgeClass(user?.role)}`}>
                {user?.role || 'PATIENT'}
              </span>
            </div>
          </div>

          <div className="profile-body">
            <form onSubmit={handleUpdateProfile}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Blood Group</label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Emergency Contact</label>
                  <input
                    type="tel"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  disabled={!isEditing}
                />
              </div>

              <div className="form-actions">
                {!isEditing ? (
                  <button type="button" className="btn-edit" onClick={() => setIsEditing(true)}>
                    ✏️ Edit Profile
                  </button>
                ) : (
                  <>
                    <button type="submit" className="btn-save">
                      💾 Save Changes
                    </button>
                    <button type="button" className="btn-cancel" onClick={() => setIsEditing(false)}>
                      ❌ Cancel
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="password-card">
          <h2>🔒 Change Password</h2>
          
          <form onSubmit={handleChangePassword}>
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Enter current password"
                required
              />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm new password"
                required
              />
            </div>

            <button type="submit" className="btn-change-password">
              🔐 Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
