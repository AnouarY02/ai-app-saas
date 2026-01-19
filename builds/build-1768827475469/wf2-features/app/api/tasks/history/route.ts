import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth/session";
import { getTasksByUserId } from "@/lib/tasks/store";

export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }
  const allTasks = getTasksByUserId(user.id);
  const completedTasks = allTasks.filter((t) => t.status === "completed");
  return NextResponse.json({ tasks: completedTasks });
}
