import React, { useState } from "react";
import { generateRapportage } from "@/utils/apiClient";
import AIOutputPanel from "@/components/ai/AIOutputPanel";

const RapportagePage: React.FC = () => {
  const [form, setForm] = useState({ clientNaam: "", datum: "", observaties: "", activiteiten: "", medicatie: "", bijzonderheden: "" });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await generateRapportage(form);
      setResult(data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Er is een fout opgetreden");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Rapportage</h1>
            <p className="text-gray-500 text-sm">Genereer een complete dagrapportage</p>
          </div>
        </div>
      </div>

      {!result ? (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Naam client <span className="text-red-500">*</span></label>
              <input value={form.clientNaam} onChange={set("clientNaam")} required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Voor- en achternaam" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Datum</label>
              <input type="date" value={form.datum} onChange={set("datum")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Observaties <span className="text-red-500">*</span></label>
            <textarea value={form.observaties} onChange={set("observaties")} required rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Beschrijf wat u heeft geobserveerd tijdens de dienst..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Activiteiten en dagbesteding</label>
            <textarea value={form.activiteiten} onChange={set("activiteiten")} rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Welke activiteiten zijn er uitgevoerd?" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Medicatiebeheer</label>
            <textarea value={form.medicatie} onChange={set("medicatie")} rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Eventuele bijzonderheden bij medicatietoediening..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bijzonderheden / aandachtspunten</label>
            <textarea value={form.bijzonderheden} onChange={set("bijzonderheden")} rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Overige bijzonderheden voor de overdracht..." />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
          )}

          <button type="submit" disabled={loading}
            className="w-full py-2.5 px-4 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2">
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Rapportage genereren...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Genereer rapportage
              </>
            )}
          </button>
        </form>
      ) : (
        <AIOutputPanel
          primaryOutput={result.primaryOutput}
          details={result.details}
          onReset={() => setResult(null)}
        />
      )}
    </div>
  );
};

export default RapportagePage;
