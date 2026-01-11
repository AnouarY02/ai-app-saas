import { NextRequest, NextResponse } from 'next/server';
import store from '../../../../../../lib/store';

export async function GET(_: NextRequest, { params }: { params: { clubId: string; bookingId: string } }) {
  const booking = store.getBooking(params.clubId, params.bookingId);
  if (!booking) return NextResponse.json({ error: 'Reservering niet gevonden.' }, { status: 404 });
  return NextResponse.json(booking);
}

export async function PATCH(req: NextRequest, { params }: { params: { clubId: string; bookingId: string } }) {
  const data = await req.json();
  const booking = store.updateBooking(params.clubId, params.bookingId, data);
  if (!booking) return NextResponse.json({ error: 'Reservering niet gevonden.' }, { status: 404 });
  return NextResponse.json(booking);
}

export async function DELETE(_: NextRequest, { params }: { params: { clubId: string; bookingId: string } }) {
  store.deleteBooking(params.clubId, params.bookingId);
  return NextResponse.json({ success: true });
}

