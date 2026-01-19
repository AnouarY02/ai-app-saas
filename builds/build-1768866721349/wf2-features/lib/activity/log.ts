import { addActivity } from "./store";
import { Activity } from "./types";
import { getUserById } from "lib/users/store";
import { nanoid } from "nanoid";

export function logActivity({ projectId, userId, message }: { projectId: string; userId: string; message: string }) {
  const user = getUserById(userId);
  const activity: Activity = {
    id: nanoid(),
    projectId,
    userId,
    userName: user?.name || "Unknown",
    message,
    createdAt: new Date().toISOString(),
  };
  addActivity(activity);
}
