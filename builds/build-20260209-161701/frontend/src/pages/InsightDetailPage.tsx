import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '@/utils/apiClient';

const InsightDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [insight, setInsight] = useState(null);

  useEffect(() => {
    if (id) {
      apiClient.getInsight(id).then(setInsight).catch(console.error);
    }
  }, [id]);

  if (!insight) return <div>Loading...</div>;

  return (
    <div>
      <h1>{insight.title}</h1>
      <p>{insight.content}</p>
    </div>
  );
};

export default InsightDetailPage;
