import * as React from "react";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: React.ReactNode;
  logo?: React.ReactNode;
  footerLinks?: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, logo, footerLinks }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="mb-6 text-center">{logo}</div>
        <div>{children}</div>
        <footer className="mt-6 text-center">
          {footerLinks}
        </footer>
      </div>
    </div>
  );
};
