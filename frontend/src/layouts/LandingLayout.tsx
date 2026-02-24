import React from "react";
import { Link } from "react-router-dom";

const LandingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <header className="bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <span className="text-lg font-bold text-gray-900">Zorg AI Assistent</span>
        </Link>
        <div className="flex gap-3 items-center">
          <Link to="/login" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 font-medium">Inloggen</Link>
          <Link to="/register" className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">Aan de slag</Link>
        </div>
      </nav>
    </header>
    <main className="flex-1">{children}</main>
    <footer className="bg-gray-900 text-gray-400 py-6 text-center text-sm">
      <p>&copy; 2026 Zorg AI Assistent. Alle rechten voorbehouden.</p>
    </footer>
  </div>
);

export default LandingLayout;
