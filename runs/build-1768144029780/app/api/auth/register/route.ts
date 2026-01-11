import { NextRequest, NextResponse } from "next/server";
import { addMember } from "../../../../lib/data/member-store";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: "Naam, email en wachtwoord verplicht" }, { status: 400 });
  }
  // MVP: registreer altijd bij club1 als member
  const member = await addMember({ clubId: "club1", name, email, role: "member", password });
  return NextResponse.json({ id: member.id, name: member.name, email: member.email, role: member.role });
}

