import Link from 'next/link';
import { User } from '../../lib/types';

interface MainNavProps {
  user: User | null;
}

export function MainNav({ user }: MainNavProps) {
  return (
    <nav className="w-60 bg-white border-r min-h-screen flex flex-col p-6">
      <div className="mb-8">
        <Link href="/" className="text-xl font-bold text-primary">AI Task Manager</Link>
      </div>
      <ul className="space-y-4 flex-1">
        <li><Link href="/">Dashboard</Link></li>
        <li><Link href="/tasks">Taken</Link></li>
        <li><Link href="/notifications">Notificaties</Link></li>
        {user?.role === 'admin' && <li><Link href="/users">Gebruikers</Link></li>}
        <li className="mt-auto"><Link href="/profile">Profiel</Link></li>
      </ul>
    </nav>
  );
}

