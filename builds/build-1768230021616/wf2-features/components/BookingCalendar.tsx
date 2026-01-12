import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Booking {
  id: string;
  courtId: string;
  userId: string;
  clubId: string;
  startTime: string;
  endTime: string;
  status: "pending" | "confirmed" | "cancelled";
}

export default function BookingCalendar() {
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading bookings...</div>;
  if (!bookings || bookings.length === 0) return <div>No bookings found.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {bookings.map((booking) => (
        <Card key={booking.id}>
          <CardHeader>
            <CardTitle>Booking #{booking.id}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">Court: {booking.courtId}</div>
            <div className="text-sm">User: {booking.userId}</div>
            <div className="text-sm">Status: <span className="capitalize">{booking.status}</span></div>
            <div className="text-xs mt-2">{new Date(booking.startTime).toLocaleString()} - {new Date(booking.endTime).toLocaleString()}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
