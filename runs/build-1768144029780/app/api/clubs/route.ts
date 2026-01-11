import { NextRequest, NextResponse } from "next/server";
import { getClubs, addClub } from "../../../lib/data/club-store";

export async function GET() {
  const clubs = await getClubs();
  return NextResponse.json(clubs);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data.name) return NextResponse.json({ error: "Naam verplicht" }, { status: 400 });
  const club = await addClub({ name: data.name, address: data.address });
  return NextResponse.json(club, { status: 201 });
}

