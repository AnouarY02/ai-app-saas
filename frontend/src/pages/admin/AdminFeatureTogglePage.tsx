import React, { useEffect, useState } from "react";
import { adminGetFlags, adminUpdateFlag } from "@/utils/apiClient";

const AdminFeatureTogglePage: React.FC = () => {
  const [flags, setFlags] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminGetFlags()
      .then(setFlags)
      .catch(() => setError("Kon functies niet laden"))
      .finally(() => setLoading(false));
  }, []);

  const toggle = async (flag: any) => {
    setSaving(flag.id);
    try {
      const updated = await adminUpdateFlag(flag.id, { ...flag, enabled: !flag.enabled });
      setFlags((prev) => prev.map((f) => f.id === flag.id ? updated : f));
    } catch { setError("Opslaan mislukt"); }
    finally { setSaving(null); }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" /></div>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">AI Functies</h1>
        <p className="text-gray-500 text-sm mt-1">Schakel AI-functies in of uit voor uw medewerkers</p>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
        {flags.map((flag) => (
          <div key={flag.id} className="flex items-center gap-4 px-5 py-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-gray-900 text-sm">{flag.label}</p>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${flag.enabled ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {flag.enabled ? "Actief" : "Inactief"}
                </span>
              </div>
              <p className="text-gray-500 text-xs mt-0.5">{flag.description}</p>
            </div>
            <button
              onClick={() => toggle(flag)}
              disabled={saving === flag.id}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 ${flag.enabled ? "bg-purple-600" : "bg-gray-200"} ${saving === flag.id ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              role="switch" aria-checked={flag.enabled}>
              <span className={`inline-block w-4 h-4 transform bg-white rounded-full shadow transition-transform ${flag.enabled ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-gray-400 text-center">Wijzigingen worden direct opgeslagen en zijn onmiddellijk van kracht</p>
    </div>
  );
};

export default AdminFeatureTogglePage;
