import { NextRequest, NextResponse } from "next/server";
import { getMemberByEmail } from "../../../../lib/data/member-store";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const member = await getMemberByEmail(email);
  if (!member || member.password !== password) {
    return NextResponse.json({ error: "Ongeldige inlog" }, { status: 401 });
  }
  // Zet user in cookie (MVP, niet veilig)
  return NextResponse.json({ id: member.id, name: member.name, email: member.email, role: member.role });
}

