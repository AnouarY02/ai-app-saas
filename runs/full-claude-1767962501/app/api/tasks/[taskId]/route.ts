import { NextRequest, NextResponse } from 'next/server';
import { getTaskById, updateTask, deleteTask } from '../../../../lib/data';

export async function GET(_req: NextRequest, { params }: { params: { taskId: string } }) {
  const task = await getTaskById(params.taskId);
  if (!task) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(task);
}

export async function PATCH(req: NextRequest, { params }: { params: { taskId: string } }) {
  const data = await req.json();
  await updateTask(params.taskId, data);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: { taskId: string } }) {
  await deleteTask(params.taskId);
  return NextResponse.json({ ok: true });
}

