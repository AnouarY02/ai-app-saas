import React from 'react'
import { Activity } from '../utils/apiClient'

interface ActivityItemProps {
  activity: Activity
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => (
  <li className="bg-white rounded shadow p-3 flex flex-col gap-1">
    <div className="font-semibold">{activity.type}</div>
    <div className="text-gray-600 text-sm">{JSON.stringify(activity.payload)}</div>
    <div className="text-xs text-gray-400">{new Date(activity.createdAt).toLocaleString()}</div>
  </li>
)

export default ActivityItem
