import React, { useEffect, useState } from "react";
import apiClient from "@shared/utils/apiClient";
import Button from "../components/Button";
import type { SettingsList, UpdateSettingsRequest } from "@shared/types";

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<{ key: string; value: string }[]>([]);
  const [form, setForm] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get<SettingsList>("/api/settings");
        setSettings(res.data.settings);
        setForm(
          res.data.settings.reduce((acc, s) => {
            acc[s.key] = s.value;
            return acc;
          }, {} as { [key: string]: string })
        );
        setError(null);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load settings.");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const payload: UpdateSettingsRequest = {
        settings: Object.entries(form).map(([key, value]) => ({ key, value })),
      };
      await apiClient.put<SettingsList>("/api/settings", payload);
      setSuccess(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <form onSubmit={handleSubmit} className="settings-form">
        {settings.length === 0 && (
          <div>No settings found for your account.</div>
        )}
        {settings.map((setting) => (
          <div className="form-group" key={setting.key}>
            <label htmlFor={setting.key}>{setting.key}</label>
            <input
              id={setting.key}
              name={setting.key}
              type="text"
              value={form[setting.key] || ""}
              onChange={handleChange}
            />
          </div>
        ))}
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">Settings updated!</div>}
        <Button type="submit" loading={saving} variant="primary">
          Save Settings
        </Button>
      </form>
    </div>
  );
};

export default SettingsPage;

