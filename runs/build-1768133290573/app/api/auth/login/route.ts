import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, verifyPassword } from '../../../../lib/user-store';
import { setSessionCookie } from '../../../../lib/auth';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const user = findUserByEmail(email);
  if (!user || !verifyPassword(user, password)) {
    return NextResponse.json({ error: 'Ongeldige inloggegevens' }, { status: 401 });
  }
  const res = NextResponse.json({ success: true });
  setSessionCookie(res, user.id);
  return res;
}

