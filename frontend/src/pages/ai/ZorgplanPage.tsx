import React, { useState } from "react";
import { generateZorgplan } from "@/utils/apiClient";
import AIOutputPanel from "@/components/ai/AIOutputPanel";

const ZorgplanPage: React.FC = () => {
  const [form, setForm] = useState({ clientNaam: "", geboortedatum: "", diagnose: "", zorgvraag: "", doelen: "", hulpbronnen: "", risicos: "" });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null); setResult(null);
    try { setResult(await generateZorgplan(form)); }
    catch (err: any) { setError(err.response?.data?.message || err.message || "Er is een fout opgetreden"); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Zorgplan</h1>
          <p className="text-gray-500 text-sm">Stel een volledig zorgplan op</p>
        </div>
      </div>

      {!result ? (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Naam client <span className="text-red-500">*</span></label>
              <input value={form.clientNaam} onChange={set("clientNaam")} required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Voor- en achternaam" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Geboortedatum</label>
              <input type="date" value={form.geboortedatum} onChange={set("geboortedatum")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Diagnose / probleemstelling</label>
            <textarea value={form.diagnose} onChange={set("diagnose")} rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              placeholder="Diagnose of beknopte probleemomschrijving..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Zorgvraag en behoeften <span className="text-red-500">*</span></label>
            <textarea value={form.zorgvraag} onChange={set("zorgvraag")} required rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              placeholder="Wat zijn de zorgbehoeften van de client?" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Doelen (Ã©Ã©n per regel)</label>
            <textarea value={form.doelen} onChange={set("doelen")} rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              placeholder="Zorgdoel 1&#10;Zorgdoel 2&#10;..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hulpbronnen en netwerk</label>
            <textarea value={form.hulpbronnen} onChange={set("hulpbronnen")} rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              placeholder="Familie, mantelzorg, formeel netwerk..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Risico&apos;s en aandachtspunten</label>
            <textarea value={form.risicos} onChange={set("risicos")} rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              placeholder="Bekende risico's of aandachtspunten..." />
          </div>

          {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}

          <button type="submit" disabled={loading}
            className="w-full py-2.5 px-4 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
            {loading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Zorgplan genereren...</> : <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>Genereer zorgplan</>}
          </button>
        </form>
      ) : (
        <AIOutputPanel primaryOutput={result.primaryOutput} details={result.details} onReset={() => setResult(null)} />
      )}
    </div>
  );
};

export default ZorgplanPage;
