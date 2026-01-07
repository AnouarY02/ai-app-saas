import React from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import SidebarNav from './SidebarNav'
import { useAuth } from '../context/AuthContext'

export default function MainLayout() {
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex bg-gray-100">
      <SidebarNav />
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
