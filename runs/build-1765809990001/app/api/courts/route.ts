import { NextRequest, NextResponse } from 'next/server';
import { courtsStore } from '../../../lib/store';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  return NextResponse.json(courtsStore);
}

export async function POST(req: NextRequest) {
  const { name, location, active } = await req.json();
  if (!name || !location || typeof active !== 'boolean') {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const court = {
    id: uuidv4(),
    name,
    location,
    active,
  };
  courtsStore.push(court);
  return NextResponse.json(court, { status: 201 });
}

