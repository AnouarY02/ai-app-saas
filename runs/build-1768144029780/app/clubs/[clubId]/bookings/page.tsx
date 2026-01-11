import { BookingCalendar } from "../../../../components/bookings/booking-calendar";

export default function ClubBookingsPage({ params }: { params: { clubId: string } }) {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Boekingen</h1>
      <BookingCalendar clubId={params.clubId} />
    </div>
  );
}

