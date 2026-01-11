import { NextRequest, NextResponse } from "next/server";
import { getMemberById, updateMember, deleteMember } from "../../../../../../lib/data/member-store";

export async function GET(_: NextRequest, { params }: { params: { memberId: string } }) {
  const member = await getMemberById(params.memberId);
  if (!member) return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });
  return NextResponse.json(member);
}

export async function PATCH(req: NextRequest, { params }: { params: { memberId: string } }) {
  const data = await req.json();
  const member = await updateMember(params.memberId, data);
  if (!member) return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });
  return NextResponse.json(member);
}

export async function DELETE(_: NextRequest, { params }: { params: { memberId: string } }) {
  const ok = await deleteMember(params.memberId);
  if (!ok) return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

