import { NextRequest, NextResponse } from 'next/server';
import { getTasks, addTask } from '../../../lib/data';
import { Task } from '../../../lib/types';

export async function GET() {
  const tasks = await getTasks();
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const now = new Date().toISOString();
  const task: Task = {
    id: 'task' + Date.now(),
    title: data.title,
    description: data.description,
    projectId: data.projectId,
    assigneeId: data.assigneeId,
    status: data.status || 'open',
    dueDate: data.dueDate,
    createdAt: now,
    updatedAt: now,
  };
  await addTask(task);
  return NextResponse.json(task, { status: 201 });
}

