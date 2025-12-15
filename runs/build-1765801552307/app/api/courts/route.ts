import { NextRequest, NextResponse } from 'next/server';
import { getAllCourts, createCourt } from '../../../lib/data/court-store';

export async function GET() {
  const courts = getAllCourts();
  return NextResponse.json(courts);
}

export async function POST(req: NextRequest) {
  const { name, location, description } = await req.json();
  if (!name || !location) {
    return NextResponse.json({ error: 'Naam en locatie zijn verplicht' }, { status: 400 });
  }
  const court = createCourt({ name, location, description });
  return NextResponse.json(court);
}

