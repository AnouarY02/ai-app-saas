import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail } from '../../../../lib/data/users';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const user = await findUserByEmail(email);
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  // Set cookie for MVP
  const res = NextResponse.json({ user });
  res.cookies.set('userId', user.id, { httpOnly: true });
  return res;
}

