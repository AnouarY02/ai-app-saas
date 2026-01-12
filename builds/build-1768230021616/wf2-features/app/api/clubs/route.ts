import { NextRequest, NextResponse } from "next/server";
import { getClubs, createClub } from "@/lib/clubs/utils";

export async function GET() {
  const clubs = await getClubs();
  return NextResponse.json(clubs);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const club = await createClub(data);
  return NextResponse.json(club, { status: 201 });
}
