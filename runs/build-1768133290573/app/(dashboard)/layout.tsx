import { ReactNode } from 'react';
import { Header } from '../../components/layout/header';
import { getSessionUser } from '../../lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getSessionUser();
  if (!user) {
    redirect('/login');
  }
  return (
    <>
      <Header />
      <main className="max-w-xl mx-auto p-4 w-full">{children}</main>
    </>
  );
}

