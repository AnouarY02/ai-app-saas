import Link from 'next/link';

export default function Header() {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b">
      <Link href="/" className="text-xl font-bold tracking-tight">AI App Dashboard</Link>
      <div>
        {/* Placeholder voor gebruikersmenu/account */}
        <Link href="/account" className="text-gray-700 hover:underline">Account</Link>
      </div>
    </header>
  );
}

