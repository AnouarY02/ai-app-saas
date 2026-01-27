import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const LogoutPage: React.FC = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    logout().then(() => {
      navigate('/login', { replace: true })
    })
  }, [logout, navigate])

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <div className="text-lg text-gray-700">Logging out...</div>
    </div>
  )
}

export default LogoutPage
