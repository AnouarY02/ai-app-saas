import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const navItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/features', label: 'Features' },
  { href: '/demos', label: "Demo's" },
  { href: '/account', label: 'Account' }
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-56 bg-gray-100 border-r h-full flex flex-col py-6 px-4">
      <nav className="flex flex-col gap-2">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              'px-3 py-2 rounded text-gray-700 hover:bg-gray-200',
              pathname === item.href && 'bg-gray-200 font-semibold'
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

