import { NextRequest, NextResponse } from 'next/server';
import store from '../../../../../lib/store';

export async function GET(_: NextRequest, { params }: { params: { clubId: string } }) {
  return NextResponse.json(store.getMembers(params.clubId));
}

export async function POST(req: NextRequest, { params }: { params: { clubId: string } }) {
  const data = await req.json();
  if (!data.name || !data.email) {
    return NextResponse.json({ error: 'Naam en email zijn verplicht.' }, { status: 400 });
  }
  const member = store.addMember({ clubId: params.clubId, name: data.name, email: data.email, walletBalance: data.walletBalance ?? 0 });
  return NextResponse.json(member, { status: 201 });
}

