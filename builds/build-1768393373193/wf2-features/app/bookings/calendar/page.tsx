import { Suspense } from "react";
import { CalendarView } from "@/components/bookings/CalendarView";

export default function BookingCalendarPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Court Booking Calendar</h1>
      <Suspense fallback={<div>Loading calendar...</div>}>
        <CalendarView />
      </Suspense>
    </main>
  );
}
