// Simple API client for frontend usage
export async function apiClient<T = any>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, {
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
  });
  if (!res.ok) {
    let errMsg = 'API Error';
    try {
      const err = await res.json();
      errMsg = err.message || err.error || errMsg;
    } catch {}
    throw new Error(errMsg);
  }
  return res.json();
}
