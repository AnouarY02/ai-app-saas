import { ReservationList } from '../../../components/reservations/reservation-list';

export default function ReservationsPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Mijn reserveringen</h2>
      <ReservationList />
    </div>
  );
}

