import { NextRequest, NextResponse } from 'next/server';
import { createUser, getUserByEmail } from '../../../../lib/data/user-store';

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Vul alle velden in' }, { status: 400 });
  }
  if (getUserByEmail(email)) {
    return NextResponse.json({ error: 'Gebruiker bestaat al' }, { status: 409 });
  }
  const user = await createUser({ name, email, password });
  return NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
}

