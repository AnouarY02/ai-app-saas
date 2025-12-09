import type { ReactNode } from 'react';
import { MainNav } from '../../components/layout/main-nav';
import { getCurrentUser } from '../../lib/auth';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  return (
    <div className="flex min-h-screen">
      <MainNav user={user} />
      <main className="flex-1 p-6 bg-muted/50">{children}</main>
    </div>
  );
}

