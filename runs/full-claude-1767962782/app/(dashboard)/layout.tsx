import type { ReactNode } from 'react';
import SidebarNav from '../../components/sidebar-nav';
import UserAvatar from '../../components/user-avatar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <SidebarNav />
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between px-6 py-4 border-b bg-white">
          <h1 className="text-xl font-semibold">Task Manager Pro</h1>
          <UserAvatar />
        </header>
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}

