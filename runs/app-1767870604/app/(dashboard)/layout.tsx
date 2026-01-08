import type { ReactNode } from 'react';
import Navbar from '../../components/layout/navbar';
import { getUserFromSession } from '../../lib/auth/session';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getUserFromSession();
  if (!user) {
    redirect('/login');
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  );
}

