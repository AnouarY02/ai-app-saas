import React from 'react'
import { NavLink } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'

const Sidebar: React.FC = () => (
  <aside className="w-56 bg-white border-r border-gray-200 min-h-screen flex flex-col">
    <nav className="flex-1 py-8">
      <ul className="space-y-2">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`
            }
          >
            <FiHome className="text-xl" />
            Dashboard
          </NavLink>
        </li>
      </ul>
    </nav>
  </aside>
)

export default Sidebar
