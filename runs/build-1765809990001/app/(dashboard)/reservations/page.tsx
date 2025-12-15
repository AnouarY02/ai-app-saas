import { ReservationList } from '../../../components/reservations/reservation-list';
import { ReservationForm } from '../../../components/reservations/reservation-form';

export default function ReservationsPage() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Reserveringen</h1>
      <ReservationForm />
      <div className="mt-8">
        <ReservationList />
      </div>
    </section>
  );
}

