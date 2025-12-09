import React, { useEffect, useState } from "react";
import apiClient from "@shared/utils/apiClient";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/Button";
import type { UserProfile, UpdateProfileRequest } from "@shared/types";

const ProfilePage: React.FC = () => {
  const { user, refresh } = useAuth();
  const [form, setForm] = useState<UpdateProfileRequest>({
    name: user?.name || "",
    email: user?.email || "",
    password: ""
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      password: ""
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const { name, email, password } = form;
      const payload: UpdateProfileRequest = { name, email };
      if (password) payload.password = password;
      await apiClient.put<UserProfile>("/api/profile", payload);
      setSuccess(true);
      setForm((f) => ({ ...f, password: "" }));
      await refresh();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
            autoComplete="new-password"
          />
        </div>
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">Profile updated!</div>}
        <Button type="submit" loading={saving} variant="primary">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default ProfilePage;

