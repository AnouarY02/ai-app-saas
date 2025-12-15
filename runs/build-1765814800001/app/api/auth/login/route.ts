import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '../../../../lib/auth';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const user = await authenticate(email, password);
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  // For demo: set a cookie with email
  return NextResponse.json(user, {
    headers: {
      'Set-Cookie': `user=${encodeURIComponent(user.email)}; Path=/; HttpOnly`
    }
  });
}

