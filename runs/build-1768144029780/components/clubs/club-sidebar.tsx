import Link from "next/link";

const nav = [
  { href: (clubId: string) => `/clubs/${clubId}`, label: "Dashboard" },
  { href: (clubId: string) => `/clubs/${clubId}/members`, label: "Leden" },
  { href: (clubId: string) => `/clubs/${clubId}/courts`, label: "Banen" },
  { href: (clubId: string) => `/clubs/${clubId}/bookings`, label: "Boekingen" },
  { href: (clubId: string) => `/clubs/${clubId}/wallets`, label: "Wallets" }
];

export function ClubSidebar({ clubId }: { clubId: string }) {
  return (
    <aside className="w-56 bg-white rounded shadow p-4 flex flex-col gap-2">
      {nav.map(item => (
        <Link
          key={item.label}
          href={item.href(clubId)}
          className="text-gray-700 hover:text-blue-600 py-1 px-2 rounded"
        >
          {item.label}
        </Link>
      ))}
    </aside>
  );
}

