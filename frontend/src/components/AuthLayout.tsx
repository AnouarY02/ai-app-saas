import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <div className="w-full max-w-md bg-white rounded shadow p-8">
      <Outlet />
    </div>
  </div>
)

export default AuthLayout
