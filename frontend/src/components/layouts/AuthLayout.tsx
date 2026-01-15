import * as React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  logo?: React.ReactNode;
  footerLinks?: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, logo, footerLinks }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="mb-4 text-center">{logo}</div>
        <div className="mb-6">{children}</div>
        <footer className="text-center">{footerLinks}</footer>
      </div>
    </div>
  );
};