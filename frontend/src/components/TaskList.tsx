import React from 'react'
import { Task } from '../utils/apiClient'
import TaskCard from './TaskCard'

interface TaskListProps {
  tasks: Task[]
  onDelete: (id: string) => void
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete }) => {
  if (!tasks.length) return <div className="text-gray-500 text-center py-8">No tasks found.</div>
  return (
    <div className="flex flex-col gap-4">
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default TaskList
