import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ContactsPage from './pages/ContactsPage';
import ContactFormPage from './pages/ContactFormPage';
import DealsPage from './pages/DealsPage';
import DealFormPage from './pages/DealFormPage';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute>
                <ContactsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/contacts/new"
            element={
              <PrivateRoute>
                <ContactFormPage mode="create" />
              </PrivateRoute>
            }
          />
          <Route
            path="/contacts/:id"
            element={
              <PrivateRoute>
                <ContactFormPage mode="edit" />
              </PrivateRoute>
            }
          />
          <Route
            path="/deals"
            element={
              <PrivateRoute>
                <DealsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/deals/new"
            element={
              <PrivateRoute>
                <DealFormPage mode="create" />
              </PrivateRoute>
            }
          />
          <Route
            path="/deals/:id"
            element={
              <PrivateRoute>
                <DealFormPage mode="edit" />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
