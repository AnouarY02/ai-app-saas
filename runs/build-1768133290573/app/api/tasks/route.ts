import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '../../../lib/auth';
import { getTasksByUser, createTask } from '../../../lib/task-store';

export async function GET(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 });
  }
  const tasks = getTasksByUser(user.id);
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 });
  }
  const { title, description } = await req.json();
  if (!title) {
    return NextResponse.json({ error: 'Titel is verplicht' }, { status: 400 });
  }
  const task = createTask({ userId: user.id, title, description });
  return NextResponse.json(task, { status: 201 });
}

