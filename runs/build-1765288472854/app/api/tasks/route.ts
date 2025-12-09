import { NextRequest, NextResponse } from 'next/server';
import { getTasks, createTask } from '../../../lib/data/tasks';
import { getCurrentUser } from '../../../lib/auth';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const tasks = await getTasks();
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await req.json();
  const task = await createTask({ ...data, createdBy: user.id });
  return NextResponse.json(task, { status: 201 });
}

