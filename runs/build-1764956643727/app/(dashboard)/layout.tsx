import { ReactNode } from 'react';
import { requireAuth } from '../../lib/auth';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  await requireAuth();
  return (
    <section className="max-w-3xl mx-auto py-8 px-4">
      {children}
    </section>
  );
}

