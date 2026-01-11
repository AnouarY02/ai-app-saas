import { NextRequest, NextResponse } from 'next/server';
import { usersStore } from '../../../lib/store';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  const { email, name } = await req.json();
  if (!email || !name) {
    return NextResponse.json({ error: 'Email en naam verplicht' }, { status: 400 });
  }
  let user = usersStore.getByEmail(email);
  if (!user) {
    user = usersStore.create({
      id: uuidv4(),
      name,
      email,
      role: 'user',
      credits: 0,
    });
  }
  // Simuleer sessie (mocked)
  return NextResponse.json({ user });
}

