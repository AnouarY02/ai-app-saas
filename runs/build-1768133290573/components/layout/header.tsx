import Link from 'next/link';
import { getSessionUser, clearSessionCookie } from '../../lib/auth';

export async function Header() {
  const user = await getSessionUser();

  async function handleLogout() {
    'use server';
    clearSessionCookie();
  }

  return (
    <header className="w-full bg-white border-b mb-6">
      <nav className="max-w-xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="font-bold text-lg tracking-tight text-primary">
          Nieuw App Idee
        </Link>
        <div>
          {user ? (
            <form action={handleLogout}>
              <span className="mr-4 text-gray-700">{user.name}</span>
              <button type="submit" className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Uitloggen</button>
            </form>
          ) : (
            <>
              <Link href="/login" className="mr-4 text-primary hover:underline">Inloggen</Link>
              <Link href="/register" className="text-primary hover:underline">Registreren</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

