import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail } from '../../../../lib/auth';

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get('user');
  if (!cookie) return NextResponse.json(null, { status: 401 });
  const user = await getUserByEmail(cookie.value);
  if (!user) return NextResponse.json(null, { status: 401 });
  return NextResponse.json(user);
}

