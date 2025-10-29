import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import DoctorManagement from './DoctorManagement';
import PatientManagement from './PatientManagement';
import AppointmentManagement from './AppointmentManagement';
import Reports from './Reports';
import Sidebar from '../../components/layout/Sidebar';
import './AdminRoutes.css';

const AdminRoutes = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <Routes>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="doctors" element={<DoctorManagement />} />
          <Route path="patients" element={<PatientManagement />} />
          <Route path="appointments" element={<AppointmentManagement />} />
          <Route path="reports" element={<Reports />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminRoutes;
