import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import LandingPage from './routes/LandingPage';
import LoginPage from './routes/LoginPage';
import DashboardPage from './routes/DashboardPage';
import ProfilePage from './routes/ProfilePage';
import SettingsPage from './routes/SettingsPage';
import LogoutPage from './routes/LogoutPage';
import NotFoundPage from './routes/NotFoundPage';
import { AuthProvider } from './state/authContext';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => (
  <AuthProvider>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Route>
    </Routes>
  </AuthProvider>
);

export default App;
