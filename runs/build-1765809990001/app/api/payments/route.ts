import { NextRequest, NextResponse } from 'next/server';
import { paymentsStore } from '../../../lib/store';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  return NextResponse.json(paymentsStore);
}

export async function POST(req: NextRequest) {
  const { reservationId, amount, status } = await req.json();
  if (!reservationId || typeof amount !== 'number' || !status) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const payment = {
    id: uuidv4(),
    reservationId,
    amount,
    status,
    createdAt: new Date(),
  };
  paymentsStore.push(payment);
  return NextResponse.json(payment, { status: 201 });
}

