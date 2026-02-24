import React from "react";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {children}
      </div>
    </div>
  </div>
);

export default AuthLayout;
