import { NextRequest, NextResponse } from 'next/server';
import store from '../../../../../../lib/store';

export async function GET(_: NextRequest, { params }: { params: { clubId: string; memberId: string } }) {
  const member = store.getMember(params.clubId, params.memberId);
  if (!member) return NextResponse.json({ error: 'Lid niet gevonden.' }, { status: 404 });
  return NextResponse.json(member);
}

export async function PATCH(req: NextRequest, { params }: { params: { clubId: string; memberId: string } }) {
  const data = await req.json();
  const member = store.updateMember(params.clubId, params.memberId, data);
  if (!member) return NextResponse.json({ error: 'Lid niet gevonden.' }, { status: 404 });
  return NextResponse.json(member);
}

export async function DELETE(_: NextRequest, { params }: { params: { clubId: string; memberId: string } }) {
  store.deleteMember(params.clubId, params.memberId);
  return NextResponse.json({ success: true });
}

