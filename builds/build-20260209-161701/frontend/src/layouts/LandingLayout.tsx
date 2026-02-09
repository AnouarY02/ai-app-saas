import React from 'react';
import { Outlet } from 'react-router-dom';

const LandingLayout: React.FC = () => {
  return (
    <div>
      <header className="bg-white shadow">
        {/* Header content */}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default LandingLayout;
