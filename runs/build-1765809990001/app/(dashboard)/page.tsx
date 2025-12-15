export default function DashboardPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a href="/dashboard/courts" className="block bg-white shadow rounded p-6 hover:bg-blue-50 transition">
          <h2 className="text-xl font-semibold mb-2">Padelbanen</h2>
          <p className="text-gray-600">Bekijk en beheer alle padelbanen.</p>
        </a>
        <a href="/dashboard/reservations" className="block bg-white shadow rounded p-6 hover:bg-blue-50 transition">
          <h2 className="text-xl font-semibold mb-2">Reserveringen</h2>
          <p className="text-gray-600">Bekijk en beheer reserveringen.</p>
        </a>
        <a href="/dashboard/payments" className="block bg-white shadow rounded p-6 hover:bg-blue-50 transition">
          <h2 className="text-xl font-semibold mb-2">Betalingen</h2>
          <p className="text-gray-600">Bekijk betalingen.</p>
        </a>
        <a href="/dashboard/users" className="block bg-white shadow rounded p-6 hover:bg-blue-50 transition">
          <h2 className="text-xl font-semibold mb-2">Gebruikers</h2>
          <p className="text-gray-600">Beheer gebruikers (admin).</p>
        </a>
      </div>
    </section>
  );
}

