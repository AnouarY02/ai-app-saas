import React, { useState } from "react";
import { generateRisicosignalering } from "@/utils/apiClient";
import AIOutputPanel from "@/components/ai/AIOutputPanel";

const RisicosignaleringPage: React.FC = () => {
  const [form, setForm] = useState({ clientNaam: "", leeftijd: "", signalen: "", context: "", medischeAchtergrond: "" });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null); setResult(null);
    try { setResult(await generateRisicosignalering(form)); }
    catch (err: any) { setError(err.response?.data?.message || err.message || "Er is een fout opgetreden"); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Risicosignalering</h1>
          <p className="text-gray-500 text-sm">Analyseer en documenteer risicosignalen</p>
        </div>
      </div>

      {!result ? (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Naam client <span className="text-red-500">*</span></label>
              <input value={form.clientNaam} onChange={set("clientNaam")} required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Voor- en achternaam" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Leeftijd</label>
              <input type="number" value={form.leeftijd} onChange={set("leeftijd")} min="0" max="120"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Leeftijd in jaren" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gesignaleerde risico&apos;s <span className="text-red-500">*</span></label>
            <textarea value={form.signalen} onChange={set("signalen")} required rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              placeholder="Beschrijf de gesignaleerde risico's, afwijkend gedrag of veranderingen..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Context en achtergrond</label>
            <textarea value={form.context} onChange={set("context")} rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              placeholder="Relevante context (woonsituatie, recente gebeurtenissen, etc.)..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Medische achtergrond</label>
            <textarea value={form.medischeAchtergrond} onChange={set("medischeAchtergrond")} rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              placeholder="Relevante medische diagnoses, medicatie, etc...." />
          </div>

          {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}

          <button type="submit" disabled={loading}
            className="w-full py-2.5 px-4 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
            {loading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Risicosignalering genereren...</> : <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>Genereer risicosignalering</>}
          </button>
        </form>
      ) : (
        <AIOutputPanel primaryOutput={result.primaryOutput} details={result.details} onReset={() => setResult(null)} />
      )}
    </div>
  );
};

export default RisicosignaleringPage;
