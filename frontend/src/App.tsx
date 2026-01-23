import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import Footer from './components/Footer'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-slate-50">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
