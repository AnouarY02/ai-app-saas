import React, { useEffect, useState, useMemo } from "react";
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

/** Koppelt flag.key (ai_rapportage) aan format.moduleKey (rapportage) */
function getModuleKey(flag: { key: string }): string {
  return flag.key.replace(/^ai_/, "");
}

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

  /** Per module: flag + bijbehorend format (op moduleKey). Zoals op de oplossing-pagina: format én AI-module in één scherm. */
  const modules = useMemo(() => {
    return flags.map((flag) => {
      const moduleKey = getModuleKey(flag);
      const format = formats.find((f) => (f.moduleKey || f.key) === moduleKey);
      return { flag, format, moduleKey };
    });
  }, [flags, formats]);

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

  const loading = flagsLoading || formatsLoading;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Output beheren</h1>
        <p className="text-gray-500 text-sm mt-1">
          Formaten én AI-modules in één scherm. Stel per module de documentstructuur in (organisatieformat) en bepaal of de AI-functie actief is. Alles wat de output bepaalt, op één plek.
        </p>
      </div>

      {flagsError && (
        <div className={`p-3 rounded-lg text-sm ${flagsFallback ? "bg-amber-50 border border-amber-200 text-amber-800" : "bg-red-50 border border-red-200 text-red-700"}`}>
          {flagsError}
        </div>
      )}
      {formatsError && !loading && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">{formatsError}</div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
        </div>
      ) : (
        <div className="space-y-6">
          {modules.map(({ flag, format, moduleKey }) => (
            <section
              key={flag.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden"
            >
              {/* Per module: header met AI-toggle + organisatieformat in één paneel */}
              <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-gray-900">{flag.label}</h2>
                  <p className="text-gray-500 text-xs mt-0.5">{flag.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${flag.enabled ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {flag.enabled ? "AI actief" : "AI uit"}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleFlag(flag)}
                    disabled={flagsFallback || savingFlag === flag.id}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${flag.enabled ? "bg-purple-600" : "bg-gray-200"}`}
                    role="switch"
                    aria-checked={flag.enabled}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${flag.enabled ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                </div>
              </div>

              {/* Organisatieformat voor deze module */}
              <div className="p-5">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Organisatieformat</h3>
                {format ? (
                  <div className="border border-gray-100 rounded-lg p-4 bg-gray-50/50">
                    {editingFormatId !== format.id ? (
                      <>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-xs text-gray-500">Sjabloon voor {flag.label} (placeholders: {"{datum}"}, {"{medewerker}"}, {"{inhoud}"})</span>
                          <button
                            type="button"
                            onClick={() => startEditFormat(format)}
                            className="text-sm text-purple-600 hover:text-purple-700"
                          >
                            Bewerken
                          </button>
                        </div>
                        <pre className="text-gray-600 text-xs whitespace-pre-wrap bg-white p-3 rounded border border-gray-100">{format.template || "—"}</pre>
                      </>
                    ) : (
                      <>
                        <textarea
                          value={editTemplate}
                          onChange={(e) => setEditTemplate(e.target.value)}
                          rows={5}
                          className="w-full border border-gray-200 rounded-lg p-2 text-sm font-mono mb-3"
                          placeholder="Datum: {datum}\nMedewerker: {medewerker}\n\n{inhoud}"
                        />
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={saveFormat}
                            disabled={savingFormat === format.id}
                            className="text-sm bg-purple-600 text-white px-3 py-1.5 rounded hover:bg-purple-700 disabled:opacity-50"
                          >
                            {savingFormat === format.id ? "Opslaan…" : "Opslaan"}
                          </button>
                          <button type="button" onClick={cancelEditFormat} className="text-sm text-gray-600 hover:text-gray-800">
                            Annuleren
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Geen format gekoppeld aan deze module. Start de backend om standaardformats te laden.</p>
                )}
              </div>
            </section>
          ))}
        </div>
      )}

      {!loading && modules.length > 0 && (
        <p className="text-xs text-gray-400 text-center">
          Wijzigingen worden direct opgeslagen en zijn onmiddellijk van kracht.
        </p>
      )}
    </div>
  );
};

export default AdminOutputPage;
