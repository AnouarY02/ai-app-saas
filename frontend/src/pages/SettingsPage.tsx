import React from 'react';

const SettingsPage = () => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-900 text-white">
        <nav className="space-y-4 p-4">
          <a href="/dashboard" className="block text-lg font-bold">Dashboard</a>
          <a href="/settings" className="block text-lg font-bold">Settings</a>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      </main>
    </div>
  );
};

export default SettingsPage;