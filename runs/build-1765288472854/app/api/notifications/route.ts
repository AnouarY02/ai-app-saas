import { NextResponse } from 'next/server';
import { getNotificationsForUser } from '../../../lib/data/notifications';
import { getCurrentUser } from '../../../lib/auth';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const notifications = await getNotificationsForUser(user.id);
  return NextResponse.json(notifications);
}

