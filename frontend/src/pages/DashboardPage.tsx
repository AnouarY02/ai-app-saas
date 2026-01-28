import React, { useEffect, useState } from 'react';
import { getTasks, Task } from '../utils/apiClient';

const DashboardPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getTasks();
        setTasks(tasks);
      } catch (err) {
        setError('Failed to load tasks');
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      {error && <p>{error}</p>}
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;