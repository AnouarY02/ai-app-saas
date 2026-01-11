import { NextRequest, NextResponse } from "next/server";
import { getCourtsByClub, addCourt } from "../../../../../lib/data/court-store";

export async function GET(_: NextRequest, { params }: { params: { clubId: string } }) {
  const courts = await getCourtsByClub(params.clubId);
  return NextResponse.json(courts);
}

export async function POST(req: NextRequest, { params }: { params: { clubId: string } }) {
  const data = await req.json();
  if (!data.name) return NextResponse.json({ error: "Naam verplicht" }, { status: 400 });
  const court = await addCourt({ clubId: params.clubId, name: data.name });
  return NextResponse.json(court, { status: 201 });
}

