import React, { useEffect, useState } from "react";
import { adminGetBranding, adminUpdateBranding } from "@/utils/apiClient";

const AdminBrandingPage: React.FC = () => {
  const [form, setForm] = useState({ orgName: "", primaryColor: "#2563eb", secondaryColor: "#7c3aed", accentColor: "#059669", logoUrl: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminGetBranding()
      .then((data) => { if (data) setForm({ orgName: data.orgName || "", primaryColor: data.primaryColor || "#2563eb", secondaryColor: data.secondaryColor || "#7c3aed", accentColor: data.accentColor || "#059669", logoUrl: data.logoUrl || "" }); })
      .catch(() => setError("Kon huisstijl niet laden"))
      .finally(() => setLoading(false));
  }, []);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setError(null);
    try {
      await adminUpdateBranding(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) { setError(err.response?.data?.message || "Opslaan mislukt"); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" /></div>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Huisstijl</h1>
        <p className="text-gray-500 text-sm mt-1">Stel de naam, kleuren en het logo van uw organisatie in</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Organisatienaam</label>
          <input value={form.orgName} onChange={set("orgName")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Naam van uw zorgorganisatie" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Kleurenpalet</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { field: "primaryColor", label: "Primaire kleur" },
              { field: "secondaryColor", label: "Secundaire kleur" },
              { field: "accentColor", label: "Accentkleur" },
            ].map(({ field, label }) => (
              <div key={field} className="space-y-2">
                <label className="text-xs font-medium text-gray-500">{label}</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={(form as any)[field]} onChange={set(field)}
                    className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5" />
                  <input value={(form as any)[field]} onChange={set(field)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="#000000" pattern="^#[0-9A-Fa-f]{6}$" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
          <input value={form.logoUrl} onChange={set("logoUrl")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="https://..." type="url" />
          {form.logoUrl && (
            <div className="mt-2 p-3 bg-gray-50 rounded-lg flex items-center gap-3">
              <img src={form.logoUrl} alt="Logo preview" className="h-10 object-contain" onError={(e) => (e.currentTarget.style.display = "none")} />
              <span className="text-xs text-gray-500">Voorbeeld</span>
            </div>
          )}
        </div>

        {/* Preview */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Voorbeeld</label>
          <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: form.primaryColor }}>
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="font-bold text-gray-900">{form.orgName || "Uw organisatie"}</span>
            </div>
            <div className="flex gap-2">
              <div className="px-3 py-1 rounded-full text-white text-xs font-medium" style={{ backgroundColor: form.primaryColor }}>Primair</div>
              <div className="px-3 py-1 rounded-full text-white text-xs font-medium" style={{ backgroundColor: form.secondaryColor }}>Secundair</div>
              <div className="px-3 py-1 rounded-full text-white text-xs font-medium" style={{ backgroundColor: form.accentColor }}>Accent</div>
            </div>
          </div>
        </div>

        {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}
        {saved && <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">Huisstijl opgeslagen!</div>}

        <button type="submit" disabled={saving}
          className="w-full py-2.5 px-4 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
          {saving ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Opslaan...</> : "Huisstijl opslaan"}
        </button>
      </form>
    </div>
  );
};

export default AdminBrandingPage;
