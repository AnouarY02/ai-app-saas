import { NextRequest, NextResponse } from 'next/server';
import { register } from '../../../../lib/auth/actions';

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  const result = await register({ name, email, password });
  if (result.success) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false, error: result.error }, { status: 400 });
}

