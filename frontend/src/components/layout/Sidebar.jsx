import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { APP_CONFIG } from '../../config/appConfig';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, role, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Navigation items based on role
  const getNavigationItems = () => {
    if (role === APP_CONFIG.ROLES.ADMIN) {
      return [
        { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
        { path: '/admin/doctors', icon: '👨‍⚕️', label: 'Doctors' },
        { path: '/admin/patients', icon: '🏥', label: 'Patients' },
        { path: '/admin/appointments', icon: '📅', label: 'Appointments' },
        { path: '/admin/reports', icon: '📈', label: 'Reports' },
        { path: '/admin/billing', icon: '💰', label: 'Billing' },
      ];
    } else if (role === APP_CONFIG.ROLES.DOCTOR) {
      return [
        { path: '/doctor/dashboard', icon: '📊', label: 'Dashboard' },
        { path: '/doctor/appointments', icon: '📅', label: 'Appointments' },
        { path: '/doctor/patients', icon: '🏥', label: 'My Patients' },
        { path: '/doctor/prescriptions', icon: '💊', label: 'Prescriptions' },
        { path: '/doctor/schedule', icon: '🕐', label: 'My Schedule' },
      ];
    } else if (role === APP_CONFIG.ROLES.PATIENT) {
      return [
        { path: '/patient/dashboard', icon: '📊', label: 'Dashboard' },
        { path: '/patient/appointments', icon: '📅', label: 'My Appointments' },
        { path: '/patient/doctors', icon: '👨‍⚕️', label: 'Find Doctors' },
        { path: '/patient/prescriptions', icon: '💊', label: 'Prescriptions' },
        { path: '/patient/medical-records', icon: '📋', label: 'Medical Records' },
        { path: '/patient/billing', icon: '💰', label: 'Billing' },
      ];
    }
    return [];
  };

  const navigationItems = getNavigationItems();

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        {!isCollapsed && (
          <div className="sidebar-logo">
            <h2>🏥 HMS</h2>
          </div>
        )}
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      {/* User Info */}
      <div className="sidebar-user">
        <div className="user-avatar">
          {user?.firstName?.charAt(0) || 'U'}
        </div>
        {!isCollapsed && (
          <div className="user-details">
            <h4>{user?.firstName} {user?.lastName}</h4>
            <span className="user-role">{role}</span>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <ul>
          {navigationItems.map((item, index) => (
            <li key={index}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => isActive ? 'active' : ''}
                title={isCollapsed ? item.label : ''}
              >
                <span className="nav-icon">{item.icon}</span>
                {!isCollapsed && <span className="nav-label">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="sidebar-footer">
        <button className="logout-button" onClick={handleLogout}>
          <span className="nav-icon">🚪</span>
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
