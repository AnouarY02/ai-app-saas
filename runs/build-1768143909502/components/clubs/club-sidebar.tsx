import Link from 'next/link';

const nav = [
  { href: (clubId: string) => `/clubs/${clubId}/dashboard`, label: 'Dashboard' },
  { href: (clubId: string) => `/clubs/${clubId}/members`, label: 'Leden' },
  { href: (clubId: string) => `/clubs/${clubId}/courts`, label: 'Banen' },
  { href: (clubId: string) => `/clubs/${clubId}/bookings`, label: 'Reserveringen' },
];

export default function ClubSidebar({ clubId }: { clubId: string }) {
  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6">
      <nav className="space-y-4">
        {nav.map(item => (
          <Link
            key={item.label}
            href={item.href(clubId)}
            className="block px-3 py-2 rounded hover:bg-blue-50 text-gray-700 font-medium"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

