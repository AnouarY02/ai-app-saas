import { NextRequest, NextResponse } from 'next/server';
import { usersStore } from '../../../lib/store';
import { getSessionUser } from '../../../lib/auth';

export async function GET(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Niet geauthenticeerd' }, { status: 401 });
  return NextResponse.json({ id: user.id, email: user.email, name: user.name, createdAt: user.createdAt });
}

export async function PATCH(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Niet geauthenticeerd' }, { status: 401 });
  const { name } = await req.json();
  const updated = usersStore.update(user.id, { name });
  return NextResponse.json({ id: updated.id, email: updated.email, name: updated.name, createdAt: updated.createdAt });
}

