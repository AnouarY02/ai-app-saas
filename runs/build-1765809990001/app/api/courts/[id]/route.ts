import { NextRequest, NextResponse } from 'next/server';
import { courtsStore } from '../../../../lib/store';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const court = courtsStore.find((c) => c.id === params.id);
  if (!court) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(court);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const idx = courtsStore.findIndex((c) => c.id === params.id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const data = await req.json();
  courtsStore[idx] = { ...courtsStore[idx], ...data };
  return NextResponse.json(courtsStore[idx]);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const idx = courtsStore.findIndex((c) => c.id === params.id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  courtsStore.splice(idx, 1);
  return NextResponse.json({ success: true });
}

