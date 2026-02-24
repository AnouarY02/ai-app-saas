import React, { useState } from "react";
import { generateSignaleringplan } from "@/utils/apiClient";
import AIOutputPanel from "@/components/ai/AIOutputPanel";

const SignaleringplanPage: React.FC = () => {
  const [form, setForm] = useState({ clientNaam: "", diagnose: "", vroegeTekens: "", triggers: "", crisisGedrag: "", rustgevend: "", contacten: "", afspraken: "" });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null); setResult(null);
    try { setResult(await generateSignaleringplan(form)); }
    catch (err: any) { setError(err.response?.data?.message || err.message || "Er is een fout opgetreden"); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Signaleringsplan</h1>
          <p className="text-gray-500 text-sm">Maak een signaleringsplan of crisisplan</p>
        </div>
      </div>

      {!result ? (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Naam client <span className="text-red-500">*</span></label>
              <input value={form.clientNaam} onChange={set("clientNaam")} required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Voor- en achternaam" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Diagnose</label>
              <input value={form.diagnose} onChange={set("diagnose")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Bijv. schizofrenie, bipolaire stoornis..." />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vroege signalen / eerste tekenen <span className="text-red-500">*</span>
            </label>
            <textarea value={form.vroegeTekens} onChange={set("vroegeTekens")} required rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="Wat zijn de eerste tekenen dat het minder goed gaat?&#10;Bijv. slecht slapen, teruggetrokken gedrag..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Triggers (wat kan een crisis uitlokken)</label>
            <textarea value={form.triggers} onChange={set("triggers")} rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="Situaties of omstandigheden die een crisis kunnen uitlokken..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Crisisgedrag (hoe ziet een crisis eruit)</label>
            <textarea value={form.crisisGedrag} onChange={set("crisisGedrag")} rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="Beschrijf het gedrag tijdens een crisis..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Wat helpt / rustgevend</label>
            <textarea value={form.rustgevend} onChange={set("rustgevend")} rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="Wat werkt kalmerend of helpt de client tot rust te komen?..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Crisiscontacten</label>
            <textarea value={form.contacten} onChange={set("contacten")} rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="Contactpersonen bij een crisis (naam, telefoonnummer, rol)..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Afspraken na een crisis</label>
            <textarea value={form.afspraken} onChange={set("afspraken")} rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="Wat zijn de afspraken voor nazorg of evaluatie?" />
          </div>

          {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}

          <button type="submit" disabled={loading}
            className="w-full py-2.5 px-4 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
            {loading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Signaleringsplan genereren...</> : <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>Genereer signaleringsplan</>}
          </button>
        </form>
      ) : (
        <AIOutputPanel primaryOutput={result.primaryOutput} details={result.details} onReset={() => setResult(null)} />
      )}
    </div>
  );
};

export default SignaleringplanPage;
