import { NextRequest, NextResponse } from 'next/server';
import { createUser, findUserByEmail } from '../../../../lib/user-store';
import { setSessionCookie } from '../../../../lib/auth';

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Alle velden zijn verplicht' }, { status: 400 });
  }
  if (findUserByEmail(email)) {
    return NextResponse.json({ error: 'Gebruiker bestaat al' }, { status: 409 });
  }
  const user = createUser({ name, email, password });
  const res = NextResponse.json({ success: true });
  setSessionCookie(res, user.id);
  return res;
}

