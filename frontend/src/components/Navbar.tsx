import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <div className="font-bold">Brand</div>
        <div>
          <a href="#" className="px-3">Home</a>
          <a href="#" className="px-3">About</a>
          <a href="#" className="px-3">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;