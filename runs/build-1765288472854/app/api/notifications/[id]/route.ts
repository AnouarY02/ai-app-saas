import { NextRequest, NextResponse } from 'next/server';
import { markNotificationRead } from '../../../../lib/data/notifications';
import { getCurrentUser } from '../../../../lib/auth';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const updated = await markNotificationRead(params.id, user.id);
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}

