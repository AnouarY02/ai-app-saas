import React, { useState } from 'react';

export const DashboardLayout: React.FC = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <div className={`fixed inset-y-0 left-0 bg-gray-800 text-white transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:w-64`}>
        <button className="md:hidden p-4" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
        <nav className="p-4">
          <ul>
            <li className="py-2">Dashboard</li>
            <li className="py-2">Settings</li>
          </ul>
        </nav>
      </div>
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-100 p-4 shadow-md">
          <div className="flex justify-between items-center">
            <button className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
            <h1 className="text-xl">Dashboard</h1>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};
