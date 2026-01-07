import { useEffect, useState } from 'react';

const getBaseUrl = () => {
  return import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
};

export async function fetchHealth(): Promise<'ok' | 'fail'> {
  try {
    const res = await fetch(`${getBaseUrl()}/health`);
    if (!res.ok) return 'fail';
    const data = await res.json();
    if (data && data.status === 'ok') return 'ok';
    return 'fail';
  } catch {
    return 'fail';
  }
}

export function useHealthStatus() {
  const [status, setStatus] = useState<'ok' | 'fail' | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchHealth()
      .then((s) => {
        if (!cancelled) {
          setStatus(s);
          setError(null);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setStatus('fail');
          setError('Could not reach backend');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { status, loading, error };
}
