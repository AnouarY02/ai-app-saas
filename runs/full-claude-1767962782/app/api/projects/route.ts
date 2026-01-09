import { NextRequest, NextResponse } from 'next/server';
import { getProjects, createProject } from '../../../lib/data/projects';

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const { name, description } = await req.json();
  if (!name) return NextResponse.json({ error: 'Missing name' }, { status: 400 });
  const project = await createProject({ name, description });
  return NextResponse.json(project);
}

