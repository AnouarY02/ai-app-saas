import { NextRequest, NextResponse } from 'next/server';
import { getProjectById, updateProject, deleteProject } from '../../../../lib/data';

export async function GET(_req: NextRequest, { params }: { params: { projectId: string } }) {
  const project = await getProjectById(params.projectId);
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(project);
}

export async function PATCH(req: NextRequest, { params }: { params: { projectId: string } }) {
  const data = await req.json();
  await updateProject(params.projectId, data);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: { projectId: string } }) {
  await deleteProject(params.projectId);
  return NextResponse.json({ ok: true });
}

