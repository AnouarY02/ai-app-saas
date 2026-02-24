import React, { useState } from "react";

interface AIOutputPanelProps {
  primaryOutput: string;
  details: Record<string, any>;
  onCopy?: () => void;
  onReset?: () => void;
}

const AIOutputPanel: React.FC<AIOutputPanelProps> = ({ primaryOutput, details, onCopy, onReset }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(primaryOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onCopy?.();
  };

  const renderDetailValue = (value: any): React.ReactNode => {
    if (Array.isArray(value)) {
      return (
        <ul className="list-disc list-inside space-y-1">
          {value.map((item, i) => <li key={i} className="text-gray-700">{String(item)}</li>)}
        </ul>
      );
    }
    if (typeof value === "object" && value !== null) {
      return (
        <div className="space-y-2">
          {Object.entries(value).map(([k, v]) => (
            <div key={k}>
              <span className="text-xs font-medium text-gray-500 uppercase">{k}: </span>
              <span className="text-gray-700 text-sm">{v !== undefined && v !== null && v !== "" ? String(v) : "â€”"}</span>
            </div>
          ))}
        </div>
      );
    }
    return <span className="text-gray-700">{String(value)}</span>;
  };

  const detailLabels: Record<string, string> = {
    onderbouwing: "Onderbouwing",
    gebruikteVelden: "Gebruikte invoer",
    aannames: "Aannames",
    vervolgstappen: "Vervolgstappen",
    wetgeving: "Relevante wetgeving",
    kwaliteitscriteria: "Kwaliteitscriteria",
    risicoFactoren: "Risicofactoren",
    instrumenten: "Gebruikte instrumenten",
    methodieken: "Methodieken",
  };

  return (
    <div className="space-y-4">
      {/* Primary output */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-sm font-semibold text-gray-700">Gegenereerde output</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              {copied ? (
                <>
                  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Gekopieerd
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Kopieer
                </>
              )}
            </button>
            {onReset && (
              <button onClick={onReset}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Opnieuw
              </button>
            )}
          </div>
        </div>
        <pre className="p-5 text-sm text-gray-800 whitespace-pre-wrap font-mono leading-relaxed overflow-auto max-h-[60vh]">
          {primaryOutput}
        </pre>
      </div>

      {/* Details dropdown */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <button onClick={() => setDetailsOpen(!detailsOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-semibold text-gray-700">Extra details en onderbouwing</span>
          </div>
          <svg className={`w-5 h-5 text-gray-400 transition-transform ${detailsOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {detailsOpen && (
          <div className="bg-white divide-y divide-gray-100">
            {Object.entries(details).map(([key, value]) => {
              if (value === undefined || value === null || (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0)) return null;
              const label = detailLabels[key] || key.charAt(0).toUpperCase() + key.slice(1);
              return (
                <div key={key} className="px-4 py-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{label}</p>
                  <div className="text-sm">{renderDetailValue(value)}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIOutputPanel;
