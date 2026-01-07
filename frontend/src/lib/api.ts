import axios from 'axios';

export async function loginApi(email: string, password: string) {
  const res = await axios.post('/api/auth/login', { email, password }, { withCredentials: true });
  return res.data;
}

export async function registerApi(name: string, email: string, password: string) {
  const res = await axios.post('/api/auth/register', { name, email, password }, { withCredentials: true });
  return res.data;
}

export async function logoutApi() {
  const res = await axios.post('/api/auth/logout', {}, { withCredentials: true });
  return res.data;
}

export async function getMeApi() {
  const res = await axios.get('/api/user/me', { withCredentials: true });
  return res.data;
}

export async function updateUserProfile(data: { name?: string; email?: string; password?: string }) {
  const res = await axios.put('/api/user/me', data, { withCredentials: true });
  return res.data;
}

export async function createAIInteraction(input: string) {
  const res = await axios.post('/api/ai/interaction', { input }, { withCredentials: true });
  return res.data;
}

export async function getAIHistory() {
  const res = await axios.get('/api/ai/history', { withCredentials: true });
  return res.data;
}
