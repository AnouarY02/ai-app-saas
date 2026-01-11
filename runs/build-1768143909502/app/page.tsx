import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Padel Club Manager</h1>
      <p className="mb-8 text-gray-600">Beheer je padel club, leden, banen en reserveringen.</p>
      <Link href="/clubs" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Ga naar clubs</Link>
    </main>
  );
}

