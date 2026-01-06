import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';

const navLinks = [
  { label: 'Home', path: '/', icon: '🏠' },
  { label: 'Dashboard', path: '/dashboard', icon: '📊' },
  { label: 'Settings', path: '/settings', icon: '⚙️' },
  { label: 'About', path: '/about', icon: 'ℹ️' },
];

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="text-xl font-bold text-indigo-700">AI App</span>
          <div className="hidden md:flex gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1 px-2 py-1 rounded hover:bg-indigo-50 transition-colors ${location.pathname === link.path ? 'text-indigo-700 font-semibold' : 'text-gray-700'}`}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden sm:block text-gray-600">Hi, {user.name || user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-indigo-600 hover:underline px-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
