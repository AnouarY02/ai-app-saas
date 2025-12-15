import { CourtList } from '../../../components/courts/court-list';
import { CourtReservationForm } from '../../../components/reservations/court-reservation-form';

export default function CourtsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">Beschikbare padelbanen</h2>
        <CourtList />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Reserveer een baan</h3>
        <CourtReservationForm />
      </div>
    </div>
  );
}

