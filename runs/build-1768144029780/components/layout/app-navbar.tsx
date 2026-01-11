import Link from "next/link";
import { useAuth } from "../../lib/auth-context";

export function AppNavbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="w-full bg-white border-b mb-6 py-3 px-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/" className="font-bold text-lg">Padel Club Manager</Link>
        <Link href="/clubs" className="text-gray-700 hover:text-black">Clubs</Link>
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-gray-700">{user.name}</span>
            <button onClick={logout} className="text-sm text-blue-600 hover:underline">Uitloggen</button>
          </div>
        ) : (
          <Link href="/login" className="text-blue-600 hover:underline">Inloggen</Link>
        )}
      </div>
    </nav>
  );
}

