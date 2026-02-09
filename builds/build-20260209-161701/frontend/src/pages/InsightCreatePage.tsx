import React from 'react';
import apiClient from '@/utils/apiClient';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

const InsightCreatePage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle insight creation
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input type="text" placeholder="Title" required />
      <Textarea placeholder="Content" required />
      <Button type="submit">Create Insight</Button>
    </form>
  );
};

export default InsightCreatePage;
