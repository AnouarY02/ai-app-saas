import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import BookingsPage from './pages/BookingsPage'
import CourtsPage from './pages/CourtsPage'
import AdminPage from './pages/AdminPage'
import LandingPage from './pages/LandingPage'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (!user) return <Navigate to="/login" replace />
  if (adminOnly && user.role !== 'admin') return <Navigate to="/dashboard" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Header />
                <div className="flex min-h-screen">
                  <Sidebar />
                  <main className="flex-1 p-6 bg-gray-50">
                    <DashboardPage />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <Header />
                <div className="flex min-h-screen">
                  <Sidebar />
                  <main className="flex-1 p-6 bg-gray-50">
                    <BookingsPage />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/courts"
            element={
              <ProtectedRoute>
                <Header />
                <div className="flex min-h-screen">
                  <Sidebar />
                  <main className="flex-1 p-6 bg-gray-50">
                    <CourtsPage />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <Header />
                <div className="flex min-h-screen">
                  <Sidebar />
                  <main className="flex-1 p-6 bg-gray-50">
                    <AdminPage />
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
