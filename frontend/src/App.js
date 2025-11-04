import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';
import LandingPage from './components/common/LandingPage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminDashboard from './modules/admin/AdminDashboard';
import DoctorDashboard from './modules/doctor/DoctorDashboard';
import PatientDashboard from './modules/patient/PatientDashboard';
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
