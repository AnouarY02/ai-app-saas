import { NextRequest, NextResponse } from 'next/server';
import { paymentsStore } from '../../../../lib/store';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const payment = paymentsStore.find((p) => p.id === params.id);
  if (!payment) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(payment);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const idx = paymentsStore.findIndex((p) => p.id === params.id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const data = await req.json();
  paymentsStore[idx] = { ...paymentsStore[idx], ...data };
  return NextResponse.json(paymentsStore[idx]);
}

