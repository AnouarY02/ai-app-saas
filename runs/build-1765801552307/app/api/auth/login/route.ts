import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, verifyPassword } from '../../../../lib/data/user-store';
import { createSession } from '../../../../lib/session';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const user = getUserByEmail(email);
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return NextResponse.json({ error: 'Ongeldige inloggegevens' }, { status: 401 });
  }
  const session = createSession(user.id);
  const res = NextResponse.json({ success: true });
  res.cookies.set('session', session, { httpOnly: true, path: '/' });
  return res;
}

