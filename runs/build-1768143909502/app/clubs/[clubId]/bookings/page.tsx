import BookingList from '../../../../components/bookings/booking-list';
import BookingForm from '../../../../components/bookings/booking-form';

export default function BookingsPage({ params }: { params: { clubId: string } }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Reserveringen</h2>
      <BookingForm clubId={params.clubId} />
      <div className="mt-8">
        <BookingList clubId={params.clubId} />
      </div>
    </div>
  );
}

