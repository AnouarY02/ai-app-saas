import Link from 'next/link';
import { UserAvatar } from './user-avatar';
import { getCurrentUser } from '../lib/data';

export async function Sidebar() {
  const user = await getCurrentUser();
  return (
    <aside className="w-64 bg-white border-r flex flex-col min-h-screen">
      <div className="flex items-center gap-3 px-6 py-5 border-b">
        <UserAvatar user={user} size={40} />
        <div>
          <div className="font-semibold">{user?.name || 'Gebruiker'}</div>
          <div className="text-xs text-gray-500">{user?.email}</div>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link href="/" className="block px-3 py-2 rounded hover:bg-gray-100">Dashboard</Link>
        <Link href="/teams" className="block px-3 py-2 rounded hover:bg-gray-100">Teams</Link>
        <Link href="/projects" className="block px-3 py-2 rounded hover:bg-gray-100">Projecten</Link>
        <Link href="/profile" className="block px-3 py-2 rounded hover:bg-gray-100">Profiel</Link>
      </nav>
    </aside>
  );
}

