import { NextRequest, NextResponse } from 'next/server';
import { sessionsStore } from '../../../../lib/store';
import { parse } from 'cookie';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
  const cookie = req.headers.get('cookie');
  const cookies = cookie ? parse(cookie) : {};
  const sessionId = cookies.session;
  if (sessionId) {
    sessionsStore.delete(sessionId);
  }
  const expiredCookie = serialize('session', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0),
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  return new NextResponse(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Set-Cookie': expiredCookie },
  });
}

