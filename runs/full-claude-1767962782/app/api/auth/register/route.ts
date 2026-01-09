import { NextRequest, NextResponse } from 'next/server';
import { createUser, findUserByEmail } from '../../../../lib/data/users';

export async function POST(req: NextRequest) {
  const { name, email } = await req.json();
  if (!name || !email) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const existing = await findUserByEmail(email);
  if (existing) {
    return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
  }
  const user = await createUser({ name, email, password: '' });
  const res = NextResponse.json({ user });
  res.cookies.set('userId', user.id, { httpOnly: true });
  return res;
}

