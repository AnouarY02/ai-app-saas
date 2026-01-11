import { NextRequest, NextResponse } from "next/server";
import { getClubById, updateClub, deleteClub } from "../../../../lib/data/club-store";

export async function GET(_: NextRequest, { params }: { params: { clubId: string } }) {
  const club = await getClubById(params.clubId);
  if (!club) return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });
  return NextResponse.json(club);
}

export async function PATCH(req: NextRequest, { params }: { params: { clubId: string } }) {
  const data = await req.json();
  const club = await updateClub(params.clubId, data);
  if (!club) return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });
  return NextResponse.json(club);
}

export async function DELETE(_: NextRequest, { params }: { params: { clubId: string } }) {
  const ok = await deleteClub(params.clubId);
  if (!ok) return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

