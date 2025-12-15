import Link from 'next/link';
import { useUserSession } from '../lib/session-context';

export function Navbar() {
  const { user, logout } = useUserSession();
  return (
    <nav className="w-full bg-white shadow mb-8">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-blue-700">PadelCourt</Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/dashboard" className="hover:underline">Dashboard</Link>
              <button onClick={logout} className="ml-2 text-sm text-gray-600 hover:text-red-600">Uitloggen</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline">Inloggen</Link>
              <Link href="/register" className="hover:underline">Registreren</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

