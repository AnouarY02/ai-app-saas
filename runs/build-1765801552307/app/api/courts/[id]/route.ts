import { NextRequest, NextResponse } from 'next/server';
import { getCourtById, updateCourt, deleteCourt } from '../../../../lib/data/court-store';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const court = getCourtById(params.id);
  if (!court) return NextResponse.json({ error: 'Niet gevonden' }, { status: 404 });
  return NextResponse.json(court);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json();
  const court = updateCourt(params.id, data);
  if (!court) return NextResponse.json({ error: 'Niet gevonden' }, { status: 404 });
  return NextResponse.json(court);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const ok = deleteCourt(params.id);
  if (!ok) return NextResponse.json({ error: 'Niet gevonden' }, { status: 404 });
  return NextResponse.json({ success: true });
}

