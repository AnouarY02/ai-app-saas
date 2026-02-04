import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><DashboardPage /></DashboardLayout></ProtectedRoute>} />
    </Routes>
  </Router>
);

export default App;