import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TasksPage from './pages/TasksPage'
import TaskDetailPage from './pages/TaskDetailPage'
import LandingPage from './pages/LandingPage'
import MainLayout from './components/MainLayout'
import AuthLayout from './components/AuthLayout'

function AppRoutes() {
  const { user } = useAuth()
  const location = useLocation()

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={user ? <Navigate to="/tasks" /> : <LandingPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/tasks/:taskId" element={<TaskDetailPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={user ? <Navigate to="/tasks" /> : <LoginPage />} />
        <Route path="/register" element={user ? <Navigate to="/tasks" /> : <RegisterPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" state={{ from: location }} />} />
    </Routes>
  )
}

const App: React.FC = () => (
  <AuthProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AuthProvider>
)

export default App
