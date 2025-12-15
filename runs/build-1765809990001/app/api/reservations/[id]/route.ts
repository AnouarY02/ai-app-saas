import { NextRequest, NextResponse } from 'next/server';
import { reservationsStore } from '../../../../lib/store';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const reservation = reservationsStore.find((r) => r.id === params.id);
  if (!reservation) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(reservation);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const idx = reservationsStore.findIndex((r) => r.id === params.id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const data = await req.json();
  reservationsStore[idx] = { ...reservationsStore[idx], ...data };
  return NextResponse.json(reservationsStore[idx]);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const idx = reservationsStore.findIndex((r) => r.id === params.id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  reservationsStore.splice(idx, 1);
  return NextResponse.json({ success: true });
}

