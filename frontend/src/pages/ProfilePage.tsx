import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import FormField from "../components/FormField";
import Loader from "../components/Loader";
import Notification from "../components/Notification";
import { useAuth } from "../state/AuthContext";
import apiClient from "../utils/apiClient";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name required" }).optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).optional()
});

type ProfileForm = {
  name: string;
  email: string;
  password: string;
};

const ProfilePage: React.FC = () => {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState<ProfileForm>({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [apiError, setApiError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    setLoading(true);
    apiClient.get("/api/users/me")
      .then((res) => {
        setForm({ name: res.name || "", email: res.email || "", password: "" });
      })
      .catch(() => setApiError("Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
    setApiError("");
    setSuccessMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    setSuccessMsg("");
    const update: any = {};
    if (form.name) update.name = form.name;
    if (form.email) update.email = form.email;
    if (form.password) update.password = form.password;
    const result = profileSchema.safeParse(update);
    if (!result.success) {
      const fieldErrors: any = {};
      for (const err of result.error.errors) {
        fieldErrors[err.path[0]] = err.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setSaving(true);
    try {
      const updated = await apiClient.put("/api/users/me", update);
      setUser(updated);
      setSuccessMsg("Profile updated successfully");
      setForm({ ...form, password: "" });
    } catch (err: any) {
      setApiError(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <form className="form" onSubmit={handleSubmit} autoComplete="on">
      <h2>Profile</h2>
      <FormField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        error={errors.name}
        autoComplete="name"
      />
      <FormField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
        autoComplete="email"
      />
      <FormField
        label="Password (new)"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        error={errors.password}
        autoComplete="new-password"
        placeholder="Leave blank to keep current"
      />
      <Button type="submit" loading={saving} style={{ width: "100%" }}>
        Save Changes
      </Button>
      <Notification message={apiError} type="error" />
      <Notification message={successMsg} type="success" />
    </form>
  );
};

export default ProfilePage;
