import { NextRequest, NextResponse } from 'next/server';
import store from '../../../../../lib/store';

export async function GET(_: NextRequest, { params }: { params: { clubId: string } }) {
  return NextResponse.json(store.getCourts(params.clubId));
}

export async function POST(req: NextRequest, { params }: { params: { clubId: string } }) {
  const data = await req.json();
  if (!data.name) {
    return NextResponse.json({ error: 'Naam is verplicht.' }, { status: 400 });
  }
  const court = store.addCourt({ clubId: params.clubId, name: data.name });
  return NextResponse.json(court, { status: 201 });
}

