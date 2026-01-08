import { NextRequest, NextResponse } from 'next/server';
import { getUserFromSession } from '../../../../../lib/auth/session';
import { getColumnById } from '../../../../../lib/data/column';
import { getBoardById } from '../../../../../lib/data/board';
import { getTasksByColumn, createTask } from '../../../../../lib/data/task';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req: NextRequest, { params }: { params: { columnId: string } }) {
  const user = await getUserFromSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const column = getColumnById(params.columnId);
  if (!column) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const board = getBoardById(column.boardId);
  if (!board || board.ownerId !== user.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const tasks = getTasksByColumn(column.id);
  return NextResponse.json({ tasks });
}

export async function POST(req: NextRequest, { params }: { params: { columnId: string } }) {
  const user = await getUserFromSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const column = getColumnById(params.columnId);
  if (!column) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const board = getBoardById(column.boardId);
  if (!board || board.ownerId !== user.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { title, description } = await req.json();
  if (!title) return NextResponse.json({ error: 'Titel verplicht' }, { status: 400 });
  const order = getTasksByColumn(column.id).length;
  const task = {
    id: uuidv4(),
    columnId: column.id,
    title,
    description,
    order,
    createdAt: new Date().toISOString(),
  };
  createTask(task);
  return NextResponse.json({ task });
}

