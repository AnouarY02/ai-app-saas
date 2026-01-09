import { NextRequest, NextResponse } from 'next/server';
import { getTaskById, updateTask } from '../../../../lib/data/tasks';

export async function GET(req: NextRequest, { params }: { params: { taskId: string } }) {
  const task = await getTaskById(params.taskId);
  if (!task) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(task);
}

export async function PATCH(req: NextRequest, { params }: { params: { taskId: string } }) {
  const { title, description, dueDate, completed } = await req.json();
  const task = await getTaskById(params.taskId);
  if (!task) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  task.title = title || task.title;
  task.description = description || task.description;
  task.dueDate = dueDate || task.dueDate;
  task.completed = typeof completed === 'boolean' ? completed : task.completed;
  await updateTask(task);
  return NextResponse.json(task);
}

export async function DELETE() {
  // MVP: Not implemented
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
}

