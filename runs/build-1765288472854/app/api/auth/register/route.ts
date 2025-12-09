import { NextRequest, NextResponse } from 'next/server';
import { createUser, getUserByEmail } from '../../../../lib/data/users';
import { createSession } from '../../../../lib/auth';

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Alle velden zijn verplicht' }, { status: 400 });
  }
  if (await getUserByEmail(email)) {
    return NextResponse.json({ error: 'E-mailadres is al in gebruik' }, { status: 409 });
  }
  const user = await createUser({ name, email, password });
  const session = await createSession(user.id);
  const res = NextResponse.json({ success: true });
  res.cookies.set('session', session, { httpOnly: true, path: '/' });
  return res;
}

