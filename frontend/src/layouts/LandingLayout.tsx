import React from 'react';
import { Link } from 'react-router-dom';

const LandingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-brand-primary-600">AI App</Link>
          <div className="flex gap-4 items-center">
            <Link to="/about" className="text-neutral-600 hover:text-neutral-900">About</Link>
            <Link to="/pricing" className="text-neutral-600 hover:text-neutral-900">Pricing</Link>
            <Link to="/login" className="px-4 py-2 bg-brand-primary-500 text-white rounded-md hover:bg-brand-primary-600">Login</Link>
          </div>
        </nav>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-neutral-800 text-neutral-300 py-8 text-center">
        <p>&copy; 2026 AI App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingLayout;
