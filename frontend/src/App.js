import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';
import LandingPage from './components/common/LandingPage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminDashboard from './modules/admin/AdminDashboard';
import ManageDoctors from './modules/admin/ManageDoctors';
import ManagePatients from './modules/admin/ManagePatients';
import DoctorDashboard from './modules/doctor/DoctorDashboard';
import DoctorAppointments from './modules/doctor/DoctorAppointments';
import DoctorPatients from './modules/doctor/DoctorPatients';
import DoctorPrescriptions from './modules/doctor/DoctorPrescriptions';
import PatientDashboard from './modules/patient/PatientDashboard';
import PatientPrescriptions from './modules/patient/PatientPrescriptions';
import PatientRecords from './modules/patient/PatientRecords';
import BookAppointment from './modules/patient/BookAppointment';
import FindDoctors from './modules/patient/FindDoctors';
import About from './components/common/About';
import Contact from './components/common/Contact';
import HelpCenter from './components/common/HelpCenter';
import PrivacyPolicy from './components/common/PrivacyPolicy';
import TermsOfService from './components/common/TermsOfService';
import ErrorPage from './components/common/ErrorPage';
import { APP_CONFIG } from './config/appConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Protected Route Component - Requires authentication
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner message="Verifying authentication..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />

              {/* Protected Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={[APP_CONFIG.ROLES.ADMIN]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/doctors"
                element={
                  <ProtectedRoute allowedRoles={[APP_CONFIG.ROLES.ADMIN]}>
                    <ManageDoctors />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/patients"
                element={
                  <ProtectedRoute allowedRoles={[APP_CONFIG.ROLES.ADMIN]}>
                    <ManagePatients />
                  </ProtectedRoute>
                }
              />

              {/* Protected Doctor Routes */}
              <Route
                path="/doctor/dashboard"
                element={
                  <ProtectedRoute allowedRoles={[APP_CONFIG.ROLES.DOCTOR]}>
                    <DoctorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/doctor/appointments"
                element={
                  <ProtectedRoute allowedRoles={[APP_CONFIG.ROLES.DOCTOR]}>
                    <DoctorAppointments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/doctor/patients"
                element={
                  <ProtectedRoute allowedRoles={[APP_CONFIG.ROLES.DOCTOR]}>
                    <DoctorPatients />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/doctor/prescriptions"
                element={
                  <ProtectedRoute allowedRoles={[APP_CONFIG.ROLES.DOCTOR]}>
                    <DoctorPrescriptions />
                  </ProtectedRoute>
                }
              />

              {/* Protected Patient Routes */}
              <Route
                path="/patient/dashboard"
                element={
                  <ProtectedRoute allowedRoles={[APP_CONFIG.ROLES.PATIENT]}>
                    <PatientDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/prescriptions"
                element={
                  <ProtectedRoute allowedRoles={[APP_CONFIG.ROLES.PATIENT]}>
                    <PatientPrescriptions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/medical-records"
                element={
                  <ProtectedRoute allowedRoles={[APP_CONFIG.ROLES.PATIENT]}>
                    <PatientRecords />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/book-appointment"
                element={
                  <ProtectedRoute allowedRoles={[APP_CONFIG.ROLES.PATIENT]}>
                    <BookAppointment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/find-doctors"
                element={
                  <ProtectedRoute allowedRoles={[APP_CONFIG.ROLES.PATIENT]}>
                    <FindDoctors />
                  </ProtectedRoute>
                }
              />

              {/* Fallback Route - 404 Page */}
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
