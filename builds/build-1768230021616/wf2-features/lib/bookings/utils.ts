type Booking = {
  id: string;
  courtId: string;
  userId: string;
  clubId: string;
  startTime: string;
  endTime: string;
  status: "pending" | "confirmed" | "cancelled";
};

const bookings: Booking[] = [];

export async function getBookings(): Promise<Booking[]> {
  return bookings;
}

export async function createBooking(data: { courtId: string; startTime: string; endTime: string }): Promise<Booking> {
  // For MVP, userId and clubId are mocked
  const newBooking: Booking = {
    id: `booking-${bookings.length + 1}`,
    courtId: data.courtId,
    userId: "user-1",
    clubId: "club-1",
    startTime: data.startTime,
    endTime: data.endTime,
    status: "pending",
  };
  bookings.push(newBooking);
  return newBooking;
}
