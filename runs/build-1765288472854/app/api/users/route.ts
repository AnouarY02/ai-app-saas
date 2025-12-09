import { NextResponse } from 'next/server';
import { getUsers } from '../../../lib/data/users';
import { getCurrentUser } from '../../../lib/auth';

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const users = await getUsers();
  return NextResponse.json(users);
}

