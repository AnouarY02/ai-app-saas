import React, { useEffect, useState } from 'react';
// @ts-expect-error: shared types not available in this context
import type { ApiHealthStatus } from '@shared/types/api';

const fetchHealth = async (): Promise<ApiHealthStatus> => {
  const res = await fetch('/health');
  if (!res.ok) throw new Error('Failed to fetch health status');
  return res.json();
};

const HomePage: React.FC = () => {
  const [health, setHealth] = useState<ApiHealthStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHealth()
      .then(setHealth)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h1>Welcome to AI App</h1>
      <p>This is the landing page of your SaaS starter app.</p>
      <div style={{ marginTop: 24 }}>
        <h3>Backend Health Status:</h3>
        {error && <span style={{ color: 'red' }}>{error}</span>}
        {health ? (
          <span style={{ color: 'green' }}>{health.status}</span>
        ) : !error ? (
          <span>Loading...</span>
        ) : null}
      </div>
    </section>
  );
};

export default HomePage;
