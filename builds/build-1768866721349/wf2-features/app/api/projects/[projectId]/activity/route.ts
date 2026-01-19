import { NextRequest, NextResponse } from "next/server";
import { getActivitiesForProject } from "lib/activity/store";

export async function GET(req: NextRequest, { params }: { params: { projectId: string } }) {
  const { projectId } = params;
  const activities = getActivitiesForProject(projectId);
  return NextResponse.json({ activities });
}
