import * as React from "react";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: React.ReactNode;
  logo?: React.ReactNode;
  footerLinks?: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, logo, footerLinks }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-6 text-center">
          {logo}
        </div>
        <div className="mb-6">
          {children}
        </div>
        <footer className="text-center">
          {footerLinks}
        </footer>
      </div>
    </div>
  );
};