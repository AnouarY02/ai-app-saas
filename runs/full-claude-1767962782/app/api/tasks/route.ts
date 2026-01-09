import { NextRequest, NextResponse } from 'next/server';
import { getTasks, createTask } from '../../../lib/data/tasks';

export async function GET() {
  const tasks = await getTasks();
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const { title, description, dueDate, projectId } = await req.json();
  if (!title || !projectId) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  const task = await createTask({ title, description, dueDate, projectId });
  return NextResponse.json(task);
}

