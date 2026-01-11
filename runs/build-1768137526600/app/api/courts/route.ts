import { NextRequest, NextResponse } from 'next/server';
import { courtsStore } from '../../../lib/store';

export async function GET() {
  return NextResponse.json(courtsStore.getAll());
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data.name) {
    return NextResponse.json({ error: 'Naam verplicht' }, { status: 400 });
  }
  const court = courtsStore.create(data);
  return NextResponse.json(court);
}

