import Link from 'next/link';
import { getCurrentUser, logout } from '../lib/auth';

export async function Navbar() {
  const user = await getCurrentUser();
  return (
    <nav className="w-full bg-white border-b shadow-sm mb-8">
      <div className="max-w-3xl mx-auto flex items-center justify-between py-4 px-4">
        <Link href="/" className="font-bold text-lg">AI App</Link>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Link href="/dashboard" className="hover:underline">Dashboard</Link>
              <form action={logout} method="post">
                <button type="submit" className="btn btn-sm btn-outline">Uitloggen</button>
              </form>
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

