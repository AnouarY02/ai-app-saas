import { NextRequest, NextResponse } from 'next/server';
import store from '../../../lib/store';

export async function GET() {
  return NextResponse.json(store.getClubs());
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data.name) {
    return NextResponse.json({ error: 'Naam is verplicht.' }, { status: 400 });
  }
  const club = store.addClub({ name: data.name, address: data.address });
  return NextResponse.json(club, { status: 201 });
}

