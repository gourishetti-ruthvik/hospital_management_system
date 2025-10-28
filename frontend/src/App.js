import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';
import LandingPage from './components/common/LandingPage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
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

// Placeholder Dashboard Components (will be built in next commits)
const AdminDashboard = () => (
  <div style={{ padding: '50px', textAlign: 'center' }}>
    <h1>👨‍💼 Admin Dashboard</h1>
    <p>Manage doctors, patients, appointments, and reports</p>
    <p>Coming soon...</p>
  </div>
);

const DoctorDashboard = () => (
  <div style={{ padding: '50px', textAlign: 'center' }}>
    <h1>👨‍⚕️ Doctor Dashboard</h1>
    <p>View appointments, patients, and prescriptions</p>
    <p>Coming soon...</p>
  </div>
);

const PatientDashboard = () => (
  <div style={{ padding: '50px', textAlign: 'center' }}>
    <h1>🏥 Patient Dashboard</h1>
    <p>Book appointments, view prescriptions, and medical records</p>
    <p>Coming soon...</p>
  </div>
);

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

              {/* Protected Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={[APP_CONFIG.ROLES.ADMIN]}>
                    <AdminDashboard />
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

              {/* Protected Patient Routes */}
              <Route
                path="/patient/dashboard"
                element={
                  <ProtectedRoute allowedRoles={[APP_CONFIG.ROLES.PATIENT]}>
                    <PatientDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
