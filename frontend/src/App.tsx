import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ContactsPage from './pages/ContactsPage'
import DealsPage from './pages/DealsPage'
import ContactFormPage from './pages/ContactFormPage'
import DealFormPage from './pages/DealFormPage'
import MainLayout from './components/MainLayout'
import AuthLayout from './components/AuthLayout'

function ProtectedRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()
  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  return <Outlet />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/contacts/new" element={<ContactFormPage mode="create" />} />
              <Route path="/contacts/:id/edit" element={<ContactFormPage mode="edit" />} />
              <Route path="/deals" element={<DealsPage />} />
              <Route path="/deals/new" element={<DealFormPage mode="create" />} />
              <Route path="/deals/:id/edit" element={<DealFormPage mode="edit" />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
