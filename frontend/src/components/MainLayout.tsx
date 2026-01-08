import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const MainLayout: React.FC = () => (
  <div className="min-h-screen flex flex-col bg-gray-50">
    <Header />
    <main className="flex-1 max-w-3xl mx-auto w-full py-8 px-4">
      <Outlet />
    </main>
  </div>
)

export default MainLayout
