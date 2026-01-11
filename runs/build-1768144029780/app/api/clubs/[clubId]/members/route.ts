import { NextRequest, NextResponse } from "next/server";
import { getMembersByClub, addMember } from "../../../../../lib/data/member-store";

export async function GET(_: NextRequest, { params }: { params: { clubId: string } }) {
  const members = await getMembersByClub(params.clubId);
  return NextResponse.json(members);
}

export async function POST(req: NextRequest, { params }: { params: { clubId: string } }) {
  const data = await req.json();
  if (!data.name || !data.email || !data.role) {
    return NextResponse.json({ error: "Naam, email en rol verplicht" }, { status: 400 });
  }
  const member = await addMember({ clubId: params.clubId, ...data });
  return NextResponse.json(member, { status: 201 });
}

