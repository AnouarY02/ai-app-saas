import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '@/utils/apiClient';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const UserEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    if (id) {
      apiClient.getUser(id).then(setUser).catch(console.error);
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle user update
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} required />
      <Input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
      <Button type="submit">Update User</Button>
    </form>
  );
};

export default UserEditPage;
