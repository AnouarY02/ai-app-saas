import { NextRequest, NextResponse } from 'next/server';
import { usersStore } from '../../../../lib/store';
import { hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: 'Email en wachtwoord zijn verplicht' }, { status: 400 });
  }
  if (usersStore.findByEmail(email)) {
    return NextResponse.json({ error: 'Gebruiker bestaat al' }, { status: 409 });
  }
  const passwordHash = await hash(password, 10);
  const user = {
    id: uuidv4(),
    email,
    name: name || '',
    passwordHash,
    createdAt: new Date(),
  };
  usersStore.create(user);
  return NextResponse.json({ success: true }, { status: 201 });
}

