import { NextRequest, NextResponse } from 'next/server';
import store from '../../../../lib/store';

export async function GET(_: NextRequest, { params }: { params: { clubId: string } }) {
  const club = store.getClub(params.clubId);
  if (!club) return NextResponse.json({ error: 'Club niet gevonden.' }, { status: 404 });
  return NextResponse.json(club);
}

export async function PATCH(req: NextRequest, { params }: { params: { clubId: string } }) {
  const data = await req.json();
  const club = store.updateClub(params.clubId, data);
  if (!club) return NextResponse.json({ error: 'Club niet gevonden.' }, { status: 404 });
  return NextResponse.json(club);
}

export async function DELETE(_: NextRequest, { params }: { params: { clubId: string } }) {
  const ok = store.deleteClub(params.clubId);
  if (!ok) return NextResponse.json({ error: 'Club niet gevonden.' }, { status: 404 });
  return NextResponse.json({ success: true });
}

