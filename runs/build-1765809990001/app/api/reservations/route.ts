import { NextRequest, NextResponse } from 'next/server';
import { reservationsStore } from '../../../lib/store';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  return NextResponse.json(reservationsStore);
}

export async function POST(req: NextRequest) {
  const { userId, courtId, startTime, endTime, status } = await req.json();
  if (!userId || !courtId || !startTime || !endTime || !status) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const reservation = {
    id: uuidv4(),
    userId,
    courtId,
    startTime: new Date(startTime),
    endTime: new Date(endTime),
    status,
  };
  reservationsStore.push(reservation);
  return NextResponse.json(reservation, { status: 201 });
}

