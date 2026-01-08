const apiUrl = import.meta.env?.VITE_API_URL || 'http://localhost:4000'

export interface HealthCheckResponse {
  status: string
}

export async function getHealth(): Promise<HealthCheckResponse> {
  const res = await fetch(`${apiUrl}/api/health`)
  if (!res.ok) throw new Error('Failed to fetch health check')
  return res.json()
}
