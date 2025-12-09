import React from "react";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardPage from "./routes/DashboardPage";
import LoginPage from "./routes/LoginPage";
import LogoutPage from "./routes/LogoutPage";
import ProfilePage from "./routes/ProfilePage";
import SettingsPage from "./routes/SettingsPage";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="centered">Loading...</div>;
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Auth layout routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Route>
        {/* Main layout routes (protected) */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

