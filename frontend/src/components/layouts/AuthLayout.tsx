import * as React from "react";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: React.ReactNode;
  logo?: React.ReactNode;
  footerLinks?: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, logo, footerLinks }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-400 to-orange-600">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <div className="mb-4 text-center">
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