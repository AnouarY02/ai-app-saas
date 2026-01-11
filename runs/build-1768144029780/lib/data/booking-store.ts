import { v4 as uuid } from "uuid";

export interface Booking {
  id: string;
  clubId: string;
  courtId: string;
  memberId: string;
  startTime: string;
  endTime: string;
}

const bookings: Booking[] = [
  {
    id: "b1",
    clubId: "club1",
    courtId: "c1",
    memberId: "m1",
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString()
  }
];

export async function getBookingsByClub(clubId: string): Promise<Booking[]> {
  return bookings.filter(b => b.clubId === clubId);
}

export async function getBookingById(id: string): Promise<Booking | undefined> {
  return bookings.find(b => b.id === id);
}

export async function addBooking(data: Omit<Booking, "id">): Promise<Booking> {
  const booking = { id: uuid(), ...data };
  bookings.push(booking);
  return booking;
}

export async function updateBooking(id: string, data: Partial<Booking>): Promise<Booking | undefined> {
  const booking = bookings.find(b => b.id === id);
  if (!booking) return undefined;
  Object.assign(booking, data);
  return booking;
}

export async function deleteBooking(id: string): Promise<boolean> {
  const idx = bookings.findIndex(b => b.id === id);
  if (idx === -1) return false;
  bookings.splice(idx, 1);
  return true;
}

