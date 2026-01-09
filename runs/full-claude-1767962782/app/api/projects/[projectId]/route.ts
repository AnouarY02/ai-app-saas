import { NextRequest, NextResponse } from 'next/server';
import { getProjectById, updateProject } from '../../../../lib/data/projects';

export async function GET(req: NextRequest, { params }: { params: { projectId: string } }) {
  const project = await getProjectById(params.projectId);
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(project);
}

export async function PATCH(req: NextRequest, { params }: { params: { projectId: string } }) {
  const { name, description } = await req.json();
  const project = await getProjectById(params.projectId);
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  project.name = name || project.name;
  project.description = description || project.description;
  await updateProject(project);
  return NextResponse.json(project);
}

export async function DELETE() {
  // MVP: Not implemented
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
}

