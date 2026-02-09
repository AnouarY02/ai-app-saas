import React from 'react';
import apiClient from '@/utils/apiClient';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const UserCreatePage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle user creation
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input type="text" placeholder="Name" required />
      <Input type="email" placeholder="Email" required />
      <Input type="password" placeholder="Password" required />
      <Button type="submit">Create User</Button>
    </form>
  );
};

export default UserCreatePage;
