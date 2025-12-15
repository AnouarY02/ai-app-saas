import { NextRequest, NextResponse } from 'next/server';
import { registerUser } from '../../../../lib/auth';

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  const user = await registerUser(name, email, password);
  if (!user) {
    return NextResponse.json({ error: 'Gebruiker bestaat al' }, { status: 409 });
  }
  return NextResponse.json(user);
}

