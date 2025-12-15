import { getCurrentUser } from '../../lib/auth';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welkom, {user?.name ?? 'gebruiker'}!</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <a href="/dashboard/courts" className="block p-6 bg-white rounded shadow hover:bg-blue-50 transition">Padelbanen</a>
        <a href="/dashboard/reservations" className="block p-6 bg-white rounded shadow hover:bg-blue-50 transition">Reserveringen</a>
        <a href="/dashboard/payments" className="block p-6 bg-white rounded shadow hover:bg-blue-50 transition">Betalingen</a>
      </div>
    </div>
  );
}

