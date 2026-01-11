"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../lib/auth-context';

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/bookings', label: 'Boekingen' },
  { href: '/dashboard/credits', label: 'Credits' },
];

export default function DashboardNav() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  return (
    <nav className="w-56 bg-gray-100 h-screen p-6 flex flex-col gap-4 border-r">
      <div className="mb-8">
        <span className="font-bold text-lg">Padel SaaS</span>
      </div>
      <ul className="flex flex-col gap-2 flex-1">
        {navItems.map(item => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`block px-3 py-2 rounded hover:bg-blue-100 ${pathname === item.href ? 'bg-blue-200 font-semibold' : ''}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
        {user?.role === 'admin' && (
          <li>
            <Link
              href="/dashboard/admin"
              className={`block px-3 py-2 rounded hover:bg-blue-100 ${pathname === '/dashboard/admin' ? 'bg-blue-200 font-semibold' : ''}`}
            >
              Admin
            </Link>
          </li>
        )}
      </ul>
      <div className="mt-auto">
        <div className="mb-2 text-sm text-gray-600">{user?.email}</div>
        <button
          onClick={logout}
          className="w-full bg-red-500 text-white py-1 rounded hover:bg-red-600"
        >
          Uitloggen
        </button>
      </div>
    </nav>
  );
}

