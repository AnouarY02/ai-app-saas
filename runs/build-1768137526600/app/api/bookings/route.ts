import { NextRequest, NextResponse } from 'next/server';
import { bookingsStore, courtsStore, usersStore } from '../../../lib/store';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');
  if (userId) {
    return NextResponse.json(bookingsStore.getByUser(userId));
  }
  return NextResponse.json(bookingsStore.getAll());
}

export async function POST(req: NextRequest) {
  const { userId, courtId, startTime, endTime } = await req.json();
  if (!userId || !courtId || !startTime || !endTime) {
    return NextResponse.json({ error: 'Alle velden verplicht' }, { status: 400 });
  }
  // Conflict-check
  const hasConflict = bookingsStore.hasConflict(courtId, startTime, endTime);
  if (hasConflict) {
    return NextResponse.json({ error: 'Baan is al geboekt op dit tijdstip' }, { status: 409 });
  }
  // Credits check
  const user = usersStore.getById(userId);
  if (!user || user.credits < 1) {
    return NextResponse.json({ error: 'Onvoldoende credits' }, { status: 400 });
  }
  user.credits -= 1;
  const booking = bookingsStore.create({
    id: uuidv4(),
    userId,
    courtId,
    startTime,
    endTime,
  });
  return NextResponse.json(booking);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: 'Boeking-ID verplicht' }, { status: 400 });
  }
  const deleted = bookingsStore.delete(id);
  return NextResponse.json({ deleted });
}

