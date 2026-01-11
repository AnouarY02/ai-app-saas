import CreditBalance from '../../components/credits/credit-balance';
import CourtList from '../../components/courts/court-list';
import BookingList from '../../components/bookings/booking-list';
import { getCurrentUser } from '../../lib/auth';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Welkom, {user?.name || 'Gebruiker'}</h2>
      <CreditBalance />
      <section>
        <h3 className="text-xl font-semibold mb-2">Jouw Boekingen</h3>
        <BookingList />
      </section>
      <section>
        <h3 className="text-xl font-semibold mb-2">Beschikbare Banen</h3>
        <CourtList />
      </section>
    </div>
  );
}

