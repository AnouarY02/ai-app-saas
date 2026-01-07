import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded shadow p-8 w-full max-w-md">
        <Outlet />
      </div>
    </div>
  )
}
