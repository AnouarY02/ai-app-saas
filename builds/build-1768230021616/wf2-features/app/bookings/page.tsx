import { Suspense } from "react";
import BookingCalendar from "../../components/BookingCalendar";
import BookingForm from "../../components/BookingForm";

export default function BookingsPage() {
  return (
    <main className="p-6 flex flex-col gap-8">
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>
      <Suspense fallback={<div>Loading booking calendar...</div>}>
        <BookingCalendar />
      </Suspense>
      <div>
        <h2 className="text-xl font-semibold mb-2">New Booking</h2>
        <BookingForm />
      </div>
    </main>
  );
}
