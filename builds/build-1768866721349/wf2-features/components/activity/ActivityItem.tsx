import { Activity } from "lib/activity/types";
import { UserAvatar } from "components/UserAvatar";
import { formatDistanceToNow } from "date-fns";

export function ActivityItem({ activity }: { activity: Activity }) {
  return (
    <li className="flex items-start gap-3">
      <UserAvatar userId={activity.userId} size={32} />
      <div>
        <div className="text-sm">
          <span className="font-medium">{activity.userName}</span> {activity.message}
        </div>
        <div className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
        </div>
      </div>
    </li>
  );
}
