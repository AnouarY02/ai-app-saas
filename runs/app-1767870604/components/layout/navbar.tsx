import Link from 'next/link';
import { logout } from '../../lib/auth/actions';

export default function Navbar({ user }: { user: { id: string; name: string } }) {
  return (
    <nav className="bg-white border-b shadow-sm px-6 py-3 flex items-center justify-between">
      <Link href="/dashboard" className="font-bold text-xl text-primary">
        Task Manager Pro
      </Link>
      <div className="flex items-center gap-4">
        <span className="text-gray-700">{user.name}</span>
        <form action={logout}>
          <button type="submit" className="px-3 py-1 rounded bg-primary text-white hover:bg-primary/90">Uitloggen</button>
        </form>
      </div>
    </nav>
  );
}

