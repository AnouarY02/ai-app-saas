import React, { useEffect, useState } from 'react';
import apiClient from '@/utils/apiClient';

const UserListPage: React.FC = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    apiClient.getUsers().then(setUsers).catch(console.error);
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserListPage;
