import { NextRequest, NextResponse } from 'next/server';
import { creditsStore, usersStore } from '../../../lib/store';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');
  if (userId) {
    return NextResponse.json(creditsStore.getByUser(userId));
  }
  return NextResponse.json(creditsStore.getAll());
}

export async function POST(req: NextRequest) {
  const { userId, amount } = await req.json();
  if (!userId || typeof amount !== 'number' || amount <= 0) {
    return NextResponse.json({ error: 'userId en positief amount verplicht' }, { status: 400 });
  }
  const user = usersStore.getById(userId);
  if (!user) {
    return NextResponse.json({ error: 'Gebruiker niet gevonden' }, { status: 404 });
  }
  user.credits += amount;
  const tx = creditsStore.create({
    id: uuidv4(),
    userId,
    amount,
    type: 'purchase',
    createdAt: new Date().toISOString(),
  });
  return NextResponse.json(tx);
}

