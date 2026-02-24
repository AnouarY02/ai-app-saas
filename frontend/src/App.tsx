import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import LandingLayout from "@/layouts/LandingLayout";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import AdminLayout from "@/layouts/AdminLayout";

// Public pages
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";

// Medewerker pages
import DashboardPage from "@/pages/DashboardPage";
import RapportagePage from "@/pages/ai/RapportagePage";
import ZorgplanPage from "@/pages/ai/ZorgplanPage";
import RisicosignaleringPage from "@/pages/ai/RisicosignaleringPage";
import SignaleringplanPage from "@/pages/ai/SignaleringplanPage";

// Admin pages
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import AdminBrandingPage from "@/pages/admin/AdminBrandingPage";
import AdminDocumentenPage from "@/pages/admin/AdminDocumentenPage";
import AdminFeatureTogglePage from "@/pages/admin/AdminFeatureTogglePage";
import AdminOutputPage from "@/pages/admin/AdminOutputPage";
import AdminMedewerkersPage from "@/pages/admin/AdminMedewerkersPage";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" /></div>;
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" /></div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingLayout><HomePage /></LandingLayout>} />
          <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
          <Route path="/register" element={<AuthLayout><RegisterPage /></AuthLayout>} />

          {/* Medewerker dashboard */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><DashboardPage /></DashboardLayout></ProtectedRoute>} />

          {/* AI functies */}
          <Route path="/dashboard/rapportage" element={<ProtectedRoute><DashboardLayout><RapportagePage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/zorgplan" element={<ProtectedRoute><DashboardLayout><ZorgplanPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/risicosignalering" element={<ProtectedRoute><DashboardLayout><RisicosignaleringPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/signaleringplan" element={<ProtectedRoute><DashboardLayout><SignaleringplanPage /></DashboardLayout></ProtectedRoute>} />

          {/* Admin panel */}
          <Route path="/admin" element={<AdminRoute><AdminLayout><AdminDashboardPage /></AdminLayout></AdminRoute>} />
          <Route path="/admin/branding" element={<AdminRoute><AdminLayout><AdminBrandingPage /></AdminLayout></AdminRoute>} />
          <Route path="/admin/documenten" element={<AdminRoute><AdminLayout><AdminDocumentenPage /></AdminLayout></AdminRoute>} />
          <Route path="/admin/output" element={<AdminRoute><AdminLayout><AdminOutputPage /></AdminLayout></AdminRoute>} />
          <Route path="/admin/functies" element={<Navigate to="/admin/output" replace />} />
          <Route path="/admin/medewerkers" element={<AdminRoute><AdminLayout><AdminMedewerkersPage /></AdminLayout></AdminRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
