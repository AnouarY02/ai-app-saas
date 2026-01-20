import React from 'react'
import { Activity } from '../utils/apiClient'
import ActivityItem from './ActivityItem'

interface ActivityFeedProps {
  activity: Activity[]
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activity }) => (
  <ul className="flex flex-col gap-2">
    {activity.map(a => (
      <ActivityItem key={a.id} activity={a} />
    ))}
  </ul>
)

export default ActivityFeed
