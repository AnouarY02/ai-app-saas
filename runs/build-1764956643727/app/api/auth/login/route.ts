import { NextRequest, NextResponse } from 'next/server';
import { usersStore, sessionsStore } from '../../../../lib/store';
import { compare } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const user = usersStore.findByEmail(email);
  if (!user) {
    return NextResponse.json({ error: 'Ongeldige inloggegevens' }, { status: 401 });
  }
  const valid = await compare(password, user.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: 'Ongeldige inloggegevens' }, { status: 401 });
  }
  const sessionId = uuidv4();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 dagen
  sessionsStore.create({ sessionId, userId: user.id, expiresAt });
  const cookie = serialize('session', sessionId, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  return new NextResponse(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Set-Cookie': cookie },
  });
}

