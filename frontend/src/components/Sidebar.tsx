import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaTachometerAlt, FaFolderOpen, FaUsers, FaChartBar, FaBell, FaUser } from 'react-icons/fa'

const links = [
  { label: 'Dashboard', path: '/', icon: <FaTachometerAlt /> },
  { label: 'Projects', path: '/projects', icon: <FaFolderOpen /> },
  { label: 'Teams', path: '/teams', icon: <FaUsers /> },
  { label: 'Analytics', path: '/analytics', icon: <FaChartBar /> },
  { label: 'Notifications', path: '/notifications', icon: <FaBell /> },
  { label: 'Profile', path: '/profile', icon: <FaUser /> },
]

const Sidebar: React.FC = () => {
  const location = useLocation()
  return (
    <aside className="hidden md:flex flex-col w-56 bg-white border-r min-h-screen">
      <nav className="flex flex-col gap-1 mt-8">
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-3 px-6 py-3 hover:bg-blue-50 rounded-r-full transition ${location.pathname.startsWith(link.path) ? 'bg-blue-100 font-semibold' : ''}`}
          >
            <span className="text-blue-600">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
