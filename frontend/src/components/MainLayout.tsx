import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
