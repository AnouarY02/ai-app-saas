import { NextRequest, NextResponse } from 'next/server';
import store from '../../../../../lib/store';

export async function GET(_: NextRequest, { params }: { params: { clubId: string } }) {
  return NextResponse.json(store.getBookings(params.clubId));
}

export async function POST(req: NextRequest, { params }: { params: { clubId: string } }) {
  const data = await req.json();
  if (!data.courtId || !data.memberId || !data.startTime || !data.endTime) {
    return NextResponse.json({ error: 'Alle velden zijn verplicht.' }, { status: 400 });
  }
  const booking = store.addBooking({
    clubId: params.clubId,
    courtId: data.courtId,
    memberId: data.memberId,
    startTime: data.startTime,
    endTime: data.endTime,
  });
  return NextResponse.json(booking, { status: 201 });
}

