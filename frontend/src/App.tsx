import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import LandingLayout from '@/layouts/LandingLayout';
import AuthLayout from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import PricingPage from '@/pages/PricingPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import UserListPage from '@/pages/UserListPage';
import UserDetailPage from '@/pages/UserDetailPage';
import UserCreatePage from '@/pages/UserCreatePage';
import UserEditPage from '@/pages/UserEditPage';
import InsightListPage from '@/pages/InsightListPage';
import InsightDetailPage from '@/pages/InsightDetailPage';
import InsightCreatePage from '@/pages/InsightCreatePage';
import InsightEditPage from '@/pages/InsightEditPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingLayout><HomePage /></LandingLayout>} />
          <Route path="/about" element={<LandingLayout><AboutPage /></LandingLayout>} />
          <Route path="/pricing" element={<LandingLayout><PricingPage /></LandingLayout>} />
          <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
          <Route path="/register" element={<AuthLayout><RegisterPage /></AuthLayout>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><DashboardPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/users" element={<ProtectedRoute><DashboardLayout><UserListPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/users/:id" element={<ProtectedRoute><DashboardLayout><UserDetailPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/users/new" element={<ProtectedRoute><DashboardLayout><UserCreatePage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/users/:id/edit" element={<ProtectedRoute><DashboardLayout><UserEditPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/insights" element={<ProtectedRoute><DashboardLayout><InsightListPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/insights/:id" element={<ProtectedRoute><DashboardLayout><InsightDetailPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/insights/new" element={<ProtectedRoute><DashboardLayout><InsightCreatePage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/insights/:id/edit" element={<ProtectedRoute><DashboardLayout><InsightEditPage /></DashboardLayout></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
