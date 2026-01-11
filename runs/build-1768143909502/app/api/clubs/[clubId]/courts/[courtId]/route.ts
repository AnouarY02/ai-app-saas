import { NextRequest, NextResponse } from 'next/server';
import store from '../../../../../../lib/store';

export async function GET(_: NextRequest, { params }: { params: { clubId: string; courtId: string } }) {
  const court = store.getCourt(params.clubId, params.courtId);
  if (!court) return NextResponse.json({ error: 'Baan niet gevonden.' }, { status: 404 });
  return NextResponse.json(court);
}

export async function PATCH(req: NextRequest, { params }: { params: { clubId: string; courtId: string } }) {
  const data = await req.json();
  const court = store.updateCourt(params.clubId, params.courtId, data);
  if (!court) return NextResponse.json({ error: 'Baan niet gevonden.' }, { status: 404 });
  return NextResponse.json(court);
}

export async function DELETE(_: NextRequest, { params }: { params: { clubId: string; courtId: string } }) {
  store.deleteCourt(params.clubId, params.courtId);
  return NextResponse.json({ success: true });
}

