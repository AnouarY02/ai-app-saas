import { NextRequest, NextResponse } from 'next/server';
import { login } from '../../../../lib/auth/actions';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const result = await login({ email, password });
  if (result.success) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false, error: result.error }, { status: 401 });
}

