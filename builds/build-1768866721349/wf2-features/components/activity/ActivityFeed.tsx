import { useEffect, useState } from "react";
import { ActivityItem } from "components/activity/ActivityItem";
import { Activity } from "lib/activity/types";

export function ActivityFeed({ projectId }: { projectId: string }) {
  const [activities, setActivities] = useState<Activity[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/projects/${projectId}/activity`)
      .then(res => res.json())
      .then(data => {
        setActivities(data.activities);
        setLoading(false);
      });
  }, [projectId]);

  if (loading) {
    return <div className="text-muted-foreground">Loading...</div>;
  }

  if (!activities || activities.length === 0) {
    return <div className="text-muted-foreground">No recent activity.</div>;
  }

  return (
    <ul className="space-y-4">
      {activities.map(activity => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </ul>
  );
}
