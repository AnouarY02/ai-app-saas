import BookingList from '../../../components/bookings/booking-list';
import BookingForm from '../../../components/bookings/booking-form';

export default function BookingsPage() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Mijn Boekingen</h2>
      <BookingList />
      <div>
        <h3 className="text-xl font-semibold mb-2">Nieuwe Boeking</h3>
        <BookingForm />
      </div>
    </div>
  );
}

