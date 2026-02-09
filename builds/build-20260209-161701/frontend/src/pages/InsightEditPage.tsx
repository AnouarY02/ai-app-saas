import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '@/utils/apiClient';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

const InsightEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [insight, setInsight] = useState({ title: '', content: '' });

  useEffect(() => {
    if (id) {
      apiClient.getInsight(id).then(setInsight).catch(console.error);
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle insight update
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input type="text" value={insight.title} onChange={(e) => setInsight({ ...insight, title: e.target.value })} required />
      <Textarea value={insight.content} onChange={(e) => setInsight({ ...insight, content: e.target.value })} required />
      <Button type="submit">Update Insight</Button>
    </form>
  );
};

export default InsightEditPage;
