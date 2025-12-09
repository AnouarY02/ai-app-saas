import { NextRequest, NextResponse } from 'next/server';
import { getUserById, updateUser, deleteUser } from '../../../../lib/data/users';
import { getCurrentUser } from '../../../../lib/auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const target = await getUserById(params.id);
  if (!target) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(target);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await req.json();
  const updated = await updateUser(params.id, data);
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const deleted = await deleteUser(params.id);
  if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}

