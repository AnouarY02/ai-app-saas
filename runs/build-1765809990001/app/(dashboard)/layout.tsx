import { ReactNode } from 'react';
import { Navbar } from '../../components/navbar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar dashboard />
      <main className="max-w-6xl mx-auto py-8 px-4">{children}</main>
    </div>
  );
}

