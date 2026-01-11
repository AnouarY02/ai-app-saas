"use client";
import { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  credits: number;
}

export default function AdminUserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsers);
  }, []);

  return (
    <table className="w-full border text-sm">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2">Naam</th>
          <th className="p-2">E-mail</th>
          <th className="p-2">Rol</th>
          <th className="p-2">Credits</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u.id} className="border-t">
            <td className="p-2">{u.name}</td>
            <td className="p-2">{u.email}</td>
            <td className="p-2">{u.role}</td>
            <td className="p-2">{u.credits}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

