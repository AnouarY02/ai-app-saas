import { NextRequest, NextResponse } from 'next/server';
import { getReservationById, updateReservation, deleteReservation } from '../../../../lib/data/reservation-store';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const reservation = getReservationById(params.id);
  if (!reservation) return NextResponse.json({ error: 'Niet gevonden' }, { status: 404 });
  return NextResponse.json(reservation);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json();
  const reservation = updateReservation(params.id, data);
  if (!reservation) return NextResponse.json({ error: 'Niet gevonden' }, { status: 404 });
  return NextResponse.json(reservation);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const ok = deleteReservation(params.id);
  if (!ok) return NextResponse.json({ error: 'Niet gevonden' }, { status: 404 });
  return NextResponse.json({ success: true });
}

