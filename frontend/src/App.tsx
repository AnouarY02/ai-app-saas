import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { UserProvider } from './context/UserContext'
import { TeamProvider } from './context/TeamContext'
import { NotificationProvider } from './context/NotificationContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ProjectSettingsPage from './pages/ProjectSettingsPage'
import ProjectActivityPage from './pages/ProjectActivityPage'
import TeamsPage from './pages/TeamsPage'
import AnalyticsPage from './pages/AnalyticsPage'
import NotificationsPage from './pages/NotificationsPage'
import ProfilePage from './pages/ProfilePage'

function ProtectedRoute() {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (!user) return <Navigate to="/login" replace />
  return <Outlet />
}

function Layout() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 p-4 md:p-8 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

const App: React.FC = () => (
  <AuthProvider>
    <UserProvider>
      <TeamProvider>
        <NotificationProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
                  <Route path="/projects/:projectId/settings" element={<ProjectSettingsPage />} />
                  <Route path="/projects/:projectId/activity" element={<ProjectActivityPage />} />
                  <Route path="/teams" element={<TeamsPage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/notifications" element={<NotificationsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Route>
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </TeamProvider>
    </UserProvider>
  </AuthProvider>
)

export default App
