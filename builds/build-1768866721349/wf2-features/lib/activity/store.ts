import { Activity } from "./types";

let activities: Activity[] = [];

export function addActivity(activity: Activity) {
  activities.unshift(activity);
  if (activities.length > 1000) activities = activities.slice(0, 1000);
}

export function getActivitiesForProject(projectId: string): Activity[] {
  return activities.filter(a => a.projectId === projectId).slice(0, 50);
}

export function clearActivities() {
  activities = [];
}
