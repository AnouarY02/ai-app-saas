import React from 'react'
import { Comment } from '../utils/apiClient'

interface CommentListProps {
  comments: Comment[]
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => (
  <ul className="flex flex-col gap-2 mt-2">
    {comments.map(c => (
      <li key={c.id} className="bg-gray-100 rounded px-3 py-2 text-sm">
        <div className="font-semibold text-blue-700">{c.authorId}</div>
        <div>{c.content}</div>
        <div className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</div>
      </li>
    ))}
  </ul>
)

export default CommentList
