import { NextRequest, NextResponse } from 'next/server';
import { getProjects, addProject } from '../../../lib/data';
import { Project } from '../../../lib/types';

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const project: Project = {
    id: 'p' + Date.now(),
    name: data.name,
    description: data.description,
    teamId: data.teamId || 't1', // MVP default
  };
  await addProject(project);
  return NextResponse.json(project, { status: 201 });
}

