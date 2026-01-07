import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Notification from "../components/Notification";
import apiClient from "../utils/apiClient";

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    setLoading(true);
    apiClient.get("/api/users/me/settings")
      .then((res) => setSettings(res.settings || {}))
      .catch(() => setApiError("Failed to load settings"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
    setApiError("");
    setSuccessMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    setSuccessMsg("");
    setSaving(true);
    try {
      const updated = await apiClient.put("/api/users/me/settings", { settings });
      setSettings(updated.settings || {});
      setSuccessMsg("Settings updated successfully");
    } catch (err: any) {
      setApiError(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <form className="form" onSubmit={handleSubmit} autoComplete="on">
      <h2>Settings</h2>
      {/* Example: Add a couple of settings fields. You can expand as needed. */}
      <div className="form-field">
        <label htmlFor="theme">Theme</label>
        <input
          id="theme"
          name="theme"
          value={settings.theme || ""}
          onChange={handleChange}
          placeholder="light/dark"
        />
      </div>
      <div className="form-field">
        <label htmlFor="notifications">Notifications</label>
        <input
          id="notifications"
          name="notifications"
          value={settings.notifications || ""}
          onChange={handleChange}
          placeholder="on/off"
        />
      </div>
      <Button type="submit" loading={saving} style={{ width: "100%" }}>
        Save Settings
      </Button>
      <Notification message={apiError} type="error" />
      <Notification message={successMsg} type="success" />
    </form>
  );
};

export default SettingsPage;
