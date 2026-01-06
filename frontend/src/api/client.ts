import axios from 'axios';

const API_BASE = '/api';

export const api = {
  async login(email: string, password: string) {
    const res = await axios.post(`${API_BASE}/login`, { email, password });
    return res.data;
  },
  async logout(token: string) {
    const res = await axios.post(`${API_BASE}/logout`, { token });
    return res.data;
  },
  async getProfile() {
    const res = await axios.get(`${API_BASE}/profile`);
    return res.data;
  },
  async updateProfile(update: { name?: string; email?: string; password?: string }) {
    const res = await axios.put(`${API_BASE}/profile`, update);
    return res.data;
  },
  async checkSession() {
    const res = await axios.get(`${API_BASE}/session`);
    return res.data;
  },
};
