import type { ReactNode } from 'react';
import DashboardNav from '../../components/dashboard/dashboard-nav';
import { AuthProvider } from '../../lib/auth-context';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen flex">
        <DashboardNav />
        <main className="flex-1 p-8 bg-white shadow-inner">{children}</main>
      </div>
    </AuthProvider>
  );
}

