import { useState } from 'react';
import api from '../utils/apiClient';

interface UserProfile {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}

interface UpdateProfileRequest {
  name?: string;
  email?: string;
  password?: string;
}

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('aiapp_token');
      const res = await api.get<UserProfile>('/api/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: UpdateProfileRequest) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('aiapp_token');
      const res = await api.put<UserProfile>('/api/users/me', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { profile, loading, error, fetchProfile, updateProfile };
}

