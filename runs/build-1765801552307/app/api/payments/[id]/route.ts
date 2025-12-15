import { NextRequest, NextResponse } from 'next/server';
import { getPaymentById, updatePayment } from '../../../../lib/data/payment-store';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const payment = getPaymentById(params.id);
  if (!payment) return NextResponse.json({ error: 'Niet gevonden' }, { status: 404 });
  return NextResponse.json(payment);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json();
  const payment = updatePayment(params.id, data);
  if (!payment) return NextResponse.json({ error: 'Niet gevonden' }, { status: 404 });
  return NextResponse.json(payment);
}

