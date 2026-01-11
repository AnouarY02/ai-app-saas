import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '../../../../lib/auth';
import { updateTask, deleteTask, getTaskById } from '../../../../lib/task-store';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 });
  }
  const task = getTaskById(params.id);
  if (!task || task.userId !== user.id) {
    return NextResponse.json({ error: 'Niet gevonden' }, { status: 404 });
  }
  const data = await req.json();
  const updated = updateTask(params.id, data);
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 });
  }
  const task = getTaskById(params.id);
  if (!task || task.userId !== user.id) {
    return NextResponse.json({ error: 'Niet gevonden' }, { status: 404 });
  }
  deleteTask(params.id);
  return NextResponse.json({ success: true });
}

