import { NextRequest, NextResponse } from 'next/server';
import { getAllPayments, createPayment } from '../../../lib/data/payment-store';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');
  const payments = getAllPayments(userId || undefined);
  return NextResponse.json(payments);
}

export async function POST(req: NextRequest) {
  const { reservationId, userId, amount } = await req.json();
  if (!reservationId || !userId || typeof amount !== 'number') {
    return NextResponse.json({ error: 'Alle velden zijn verplicht' }, { status: 400 });
  }
  const payment = createPayment({ reservationId, userId, amount });
  return NextResponse.json(payment);
}

