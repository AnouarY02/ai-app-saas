import React, { useEffect, useState } from "react";
import {
  adminGetFlags,
  adminUpdateFlag,
  adminGetFormats,
  adminUpdateFormat,
} from "@/utils/apiClient";

const DEFAULT_FLAGS = [
  { id: "flag-rapportage", key: "ai_rapportage", label: "Rapportage", description: "AI-gegenereerde dagrapportages voor clienten", enabled: true, roles: ["admin", "medewerker"], updatedAt: "" },
  { id: "flag-zorgplan", key: "ai_zorgplan", label: "Zorgplan", description: "AI-ondersteuning bij het opstellen van zorgplannen", enabled: true, roles: ["admin", "medewerker"], updatedAt: "" },
  { id: "flag-risicosignalering", key: "ai_risicosignalering", label: "Risicosignalering", description: "AI-analyse van risicosignalen bij clienten", enabled: true, roles: ["admin", "medewerker"], updatedAt: "" },
  { id: "flag-signaleringplan", key: "ai_signaleringplan", label: "Signaleringsplan", description: "AI-ondersteuning bij het maken van signalerings- en crisisplannen", enabled: true, roles: ["admin", "medewerker"], updatedAt: "" },
];

const AdminOutputPage: React.FC = () => {
  const [flags, setFlags] = useState<any[]>([]);
  const [formats, setFormats] = useState<any[]>([]);
  const [flagsLoading, setFlagsLoading] = useState(true);
  const [formatsLoading, setFormatsLoading] = useState(true);
  const [flagsError, setFlagsError] = useState<string | null>(null);
  const [formatsError, setFormatsError] = useState<string | null>(null);
  const [flagsFallback, setFlagsFallback] = useState(false);
  const [savingFlag, setSavingFlag] = useState<string | null>(null);
  const [savingFormat, setSavingFormat] = useState<string | null>(null);
  const [editingFormatId, setEditingFormatId] = useState<string | null>(null);
  const [editTemplate, setEditTemplate] = useState("");

  useEffect(() => {
    adminGetFlags()
      .then((data) => {
        setFlags(Array.isArray(data) ? data : []);
        setFlagsFallback(false);
      })
      .catch(() => {
        setFlags(DEFAULT_FLAGS);
        setFlagsFallback(true);
        setFlagsError("Backend niet bereikbaar. Standaardlijst getoond; wijzigingen worden niet opgeslagen.");
      })
      .finally(() => setFlagsLoading(false));
  }, []);

  useEffect(() => {
    adminGetFormats()
      .then((data) => {
        setFormats(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setFormats([]);
        setFormatsError("Formats konden niet worden geladen.");
      })
      .finally(() => setFormatsLoading(false));
  }, []);

  const toggleFlag = async (flag: any) => {
    if (flagsFallback) return;
    setSavingFlag(flag.id);
    setFlagsError(null);
    try {
      const updated = await adminUpdateFlag(flag.id, { ...flag, enabled: !flag.enabled });
      setFlags((prev) => prev.map((f) => (f.id === flag.id ? updated : f)));
    } catch {
      setFlagsError("Opslaan mislukt");
    } finally {
      setSavingFlag(null);
    }
  };

  const startEditFormat = (format: any) => {
    setEditingFormatId(format.id);
    setEditTemplate(format.template || "");
  };

  const saveFormat = async () => {
    if (!editingFormatId) return;
    const format = formats.find((f) => f.id === editingFormatId);
    if (!format) return;
    setSavingFormat(editingFormatId);
    setFormatsError(null);
    try {
      const updated = await adminUpdateFormat(editingFormatId, { ...format, template: editTemplate });
      setFormats((prev) => prev.map((f) => (f.id === editingFormatId ? updated : f)));
      setEditingFormatId(null);
    } catch {
      setFormatsError("Format opslaan mislukt");
    } finally {
      setSavingFormat(null);
    }
  };

  const cancelEditFormat = () => {
    setEditingFormatId(null);
    setEditTemplate("");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Output beheren</h1>
        <p className="text-gray-500 text-sm mt-1">
          Organisatieformats en AI-modules in één scherm. Stel hier in hoe de output eruitziet en welke AI-functies actief zijn.
        </p>
      </div>

      {/* Organisatieformats */}
      <section className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="font-semibold text-gray-900">Organisatieformats</h2>
          <p className="text-gray-500 text-xs mt-0.5">Bepaal het sjabloon voor rapportages en plannen (placeholders: {"{datum}"}, {"{medewerker}"}, {"{inhoud}"})</p>
        </div>
        <div className="p-5">
          {formatsError && !formatsLoading && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">{formatsError}</div>
          )}
          {formatsLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
            </div>
          ) : formats.length === 0 ? (
            <p className="text-gray-500 text-sm">Geen formats geconfigureerd. Start de backend om standaardformats te laden.</p>
          ) : (
            <div className="space-y-4">
              {formats.map((format) => (
                <div key={format.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{format.name}</span>
                    {editingFormatId !== format.id ? (
                      <button
                        type="button"
                        onClick={() => startEditFormat(format)}
                        className="text-sm text-purple-600 hover:text-purple-700"
                      >
                        Bewerken
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={saveFormat}
                          disabled={savingFormat === format.id}
                          className="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 disabled:opacity-50"
                        >
                          {savingFormat === format.id ? "Opslaan…" : "Opslaan"}
                        </button>
                        <button type="button" onClick={cancelEditFormat} className="text-sm text-gray-600 hover:text-gray-800">
                          Annuleren
                        </button>
                      </div>
                    )}
                  </div>
                  {editingFormatId === format.id ? (
                    <textarea
                      value={editTemplate}
                      onChange={(e) => setEditTemplate(e.target.value)}
                      rows={5}
                      className="w-full border border-gray-200 rounded-lg p-2 text-sm font-mono"
                      placeholder="Datum: {datum}&#10;Medewerker: {medewerker}&#10;&#10;{inhoud}"
                    />
                  ) : (
                    <pre className="text-gray-600 text-xs whitespace-pre-wrap bg-gray-50 p-3 rounded">{format.template || "—"}</pre>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* AI-modules */}
      <section className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="font-semibold text-gray-900">AI-modules</h2>
          <p className="text-gray-500 text-xs mt-0.5">Schakel AI-functies in of uit voor medewerkers</p>
        </div>
        <div className="p-5">
          {flagsError && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${flagsFallback ? "bg-amber-50 border border-amber-200 text-amber-800" : "bg-red-50 border border-red-200 text-red-700"}`}>
              {flagsError}
            </div>
          )}
          {flagsLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {flags.map((flag) => (
                <div key={flag.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900 text-sm">{flag.label}</p>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${flag.enabled ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                      >
                        {flag.enabled ? "Actief" : "Inactief"}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs mt-0.5">{flag.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleFlag(flag)}
                    disabled={flagsFallback || savingFlag === flag.id}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${flag.enabled ? "bg-purple-600" : "bg-gray-200"}`}
                    role="switch"
                    aria-checked={flag.enabled}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${flag.enabled ? "translate-x-6" : "translate-x-1"}`}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
          <p className="mt-4 text-xs text-gray-400 text-center">
            Wijzigingen worden direct opgeslagen en zijn onmiddellijk van kracht
          </p>
        </div>
      </section>
    </div>
  );
};

export default AdminOutputPage;
