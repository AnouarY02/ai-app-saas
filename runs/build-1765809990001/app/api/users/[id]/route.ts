import { NextRequest, NextResponse } from 'next/server';
import { usersStore } from '../../../../lib/store';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const user = usersStore.find((u) => u.id === params.id);
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(user);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const idx = usersStore.findIndex((u) => u.id === params.id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const data = await req.json();
  usersStore[idx] = { ...usersStore[idx], ...data };
  return NextResponse.json(usersStore[idx]);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const idx = usersStore.findIndex((u) => u.id === params.id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  usersStore.splice(idx, 1);
  return NextResponse.json({ success: true });
}

