import React, { useEffect, useState } from 'react';
import apiClient from '@/utils/apiClient';

const InsightListPage: React.FC = () => {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    apiClient.getInsights().then(setInsights).catch(console.error);
  }, []);

  return (
    <div>
      <h1>Insight List</h1>
      <ul>
        {insights.map((insight) => (
          <li key={insight.id}>{insight.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default InsightListPage;
