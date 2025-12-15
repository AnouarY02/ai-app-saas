import { NextRequest, NextResponse } from 'next/server';
import { getAllReservations, createReservation } from '../../../lib/data/reservation-store';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');
  const reservations = getAllReservations(userId || undefined);
  return NextResponse.json(reservations);
}

export async function POST(req: NextRequest) {
  const { userId, courtId, startTime, endTime } = await req.json();
  if (!userId || !courtId || !startTime || !endTime) {
    return NextResponse.json({ error: 'Alle velden zijn verplicht' }, { status: 400 });
  }
  const reservation = createReservation({ userId, courtId, startTime, endTime });
  return NextResponse.json(reservation);
}

