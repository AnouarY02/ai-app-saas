import { NextRequest, NextResponse } from "next/server";
import { getBookingById, updateBooking, deleteBooking } from "../../../../../../lib/data/booking-store";

export async function GET(_: NextRequest, { params }: { params: { bookingId: string } }) {
  const booking = await getBookingById(params.bookingId);
  if (!booking) return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });
  return NextResponse.json(booking);
}

export async function PATCH(req: NextRequest, { params }: { params: { bookingId: string } }) {
  const data = await req.json();
  const booking = await updateBooking(params.bookingId, data);
  if (!booking) return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });
  return NextResponse.json(booking);
}

export async function DELETE(_: NextRequest, { params }: { params: { bookingId: string } }) {
  const ok = await deleteBooking(params.bookingId);
  if (!ok) return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

