import { ReactNode } from 'react';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-white overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

