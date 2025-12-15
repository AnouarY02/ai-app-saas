import type { ReactNode } from 'react';
import { Navbar } from '../../components/navbar';
import { requireUser } from '../../lib/auth';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  await requireUser();
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-5xl mx-auto py-8 px-4">{children}</main>
    </div>
  );
}

