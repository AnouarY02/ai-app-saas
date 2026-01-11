// API client abstraction for future use
const apiUrl = import.meta.env?.VITE_API_URL || 'http://localhost:4000'

// Example interface for future API responses
// export interface ExampleResponse { message: string }

// Example API call (not used yet)
// export async function fetchExample(): Promise<ExampleResponse> {
//   const res = await fetch(`${apiUrl}/api/example`)
//   if (!res.ok) throw new Error('Failed to fetch')
//   return res.json()
// }

export { apiUrl }
