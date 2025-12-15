import Link from 'next/link';

interface NavbarProps {
  dashboard?: boolean;
}

export function Navbar({ dashboard }: NavbarProps) {
  return (
    <nav className="bg-white shadow mb-8">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-700">Padelbaan SaaS</Link>
        <div className="flex gap-4">
          {dashboard ? (
            <>
              <Link href="/dashboard" className="hover:underline">Dashboard</Link>
              <Link href="/dashboard/courts" className="hover:underline">Padelbanen</Link>
              <Link href="/dashboard/reservations" className="hover:underline">Reserveringen</Link>
              <Link href="/dashboard/payments" className="hover:underline">Betalingen</Link>
              <Link href="/dashboard/users" className="hover:underline">Gebruikers</Link>
              <Link href="/login" className="hover:underline text-red-600">Uitloggen</Link>
            </>
          ) : (
            <Link href="/login" className="hover:underline">Inloggen</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

