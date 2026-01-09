import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/teams', label: 'Teams' },
  { href: '/projects', label: 'Projecten' }
];

export default function SidebarNav() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  return (
    <aside className="w-56 bg-white border-r min-h-screen flex flex-col">
      <nav className="flex-1 py-8 px-4 space-y-2">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-2 rounded hover:bg-gray-100 font-medium ${pathname === item.href ? 'bg-gray-100' : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

