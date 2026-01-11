import { NextRequest, NextResponse } from "next/server";
import { getCourtById, updateCourt, deleteCourt } from "../../../../../../lib/data/court-store";

export async function GET(_: NextRequest, { params }: { params: { courtId: string } }) {
  const court = await getCourtById(params.courtId);
  if (!court) return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });
  return NextResponse.json(court);
}

export async function PATCH(req: NextRequest, { params }: { params: { courtId: string } }) {
  const data = await req.json();
  const court = await updateCourt(params.courtId, data);
  if (!court) return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });
  return NextResponse.json(court);
}

export async function DELETE(_: NextRequest, { params }: { params: { courtId: string } }) {
  const ok = await deleteCourt(params.courtId);
  if (!ok) return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

