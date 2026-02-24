import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const aiCards = [
  {
    to: "/dashboard/rapportage",
    label: "Rapportage",
    description: "Genereer een volledige dagrapportage voor een client",
    color: "bg-blue-50 border-blue-200",
    iconBg: "bg-blue-600",
    iconPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    to: "/dashboard/zorgplan",
    label: "Zorgplan",
    description: "Stel een volledig zorgplan op voor een client",
    color: "bg-green-50 border-green-200",
    iconBg: "bg-green-600",
    iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
  },
  {
    to: "/dashboard/risicosignalering",
    label: "Risicosignalering",
    description: "Analyseer risicosignalen en stel een risicobeoordeling op",
    color: "bg-orange-50 border-orange-200",
    iconBg: "bg-orange-500",
    iconPath: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
  },
  {
    to: "/dashboard/signaleringplan",
    label: "Signaleringsplan",
    description: "Maak een signaleringsplan of crisisplan voor een client",
    color: "bg-purple-50 border-purple-200",
    iconBg: "bg-purple-600",
    iconPath: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
];

const DashboardPage: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Goedemorgen" : hour < 18 ? "Goedemiddag" : "Goedenavond";

  return (
    <div className="max-w-5xl mx-auto">
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{greeting}, {user?.name} ðŸ‘‹</h1>
        <p className="text-gray-500 mt-1">Selecteer een AI-functie om mee te beginnen.</p>
      </div>

      {/* Admin banner */}
      {isAdmin && (
        <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-purple-900 text-sm">Je bent beheerder</p>
              <p className="text-purple-700 text-xs">Toegang tot medewerkersbeheer, huisstijl, documenten en AI-instellingen</p>
            </div>
          </div>
          <Link to="/admin" className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors flex-shrink-0">
            Ga naar Beheerder Panel
          </Link>
        </div>
      )}

      {/* AI function cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {aiCards.map((card) => (
          <Link key={card.to} to={card.to}
            className={`group flex items-start gap-4 p-5 bg-white border rounded-xl hover:shadow-md transition-all ${card.color}`}>
            <div className={`w-12 h-12 ${card.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.iconPath} />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-base group-hover:text-blue-700 transition-colors">{card.label}</h3>
              <p className="text-gray-500 text-sm mt-0.5">{card.description}</p>
            </div>
            <svg className="w-5 h-5 text-gray-300 group-hover:text-blue-500 flex-shrink-0 mt-0.5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>

      {/* Quick tips */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl">
        <h3 className="font-medium text-blue-900 text-sm mb-2">Hoe werkt het?</h3>
        <ol className="text-blue-700 text-sm space-y-1">
          <li>1. Kies een AI-functie hierboven</li>
          <li>2. Vul de gevraagde gegevens in het formulier in</li>
          <li>3. De AI genereert direct een complete, professionele output</li>
          <li>4. Bekijk de onderbouwing en extra details via de uitklapbare sectie</li>
        </ol>
      </div>
    </div>
  );
};

export default DashboardPage;
