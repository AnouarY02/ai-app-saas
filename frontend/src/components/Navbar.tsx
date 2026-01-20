import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import NotificationBell from './NotificationBell'
import UserAvatar from './UserAvatar'
import TeamSelector from './TeamSelector'

const navLinks = [
  { label: 'Dashboard', path: '/', icon: '🏠' },
  { label: 'Projects', path: '/projects', icon: '📁' },
  { label: 'Teams', path: '/teams', icon: '👥' },
  { label: 'Analytics', path: '/analytics', icon: '📊' },
]

const Navbar: React.FC = () => {
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white shadow">
      <div className="flex items-center gap-4">
        <span className="font-bold text-lg text-blue-700 cursor-pointer" onClick={() => navigate('/')}>Padel Club Manager</span>
        <nav className="hidden md:flex gap-2">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded hover:bg-blue-50 ${location.pathname === link.path ? 'bg-blue-100 font-semibold' : ''}`}
            >
              <span className="mr-1">{link.icon}</span>{link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <TeamSelector />
        <NotificationBell />
        <UserAvatar user={user} />
      </div>
    </header>
  )
}

export default Navbar
