import { NextRequest, NextResponse } from 'next/server';
import { getUsers } from '../../../lib/data';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  // MVP: password check is fake
  const users = await getUsers();
  const user = users.find(u => u.email === email);
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  // Set cookie/session here in real app
  return NextResponse.json({ user });
}

