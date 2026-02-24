import React from "react";
import { Link } from "react-router-dom";

const adminCards = [
  { to: "/admin/medewerkers", label: "Medewerkers", description: "Aanmaken, wijzigen en deactiveren van medewerkers", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", color: "bg-blue-50 border-blue-200", iconBg: "bg-blue-600" },
  { to: "/admin/branding", label: "Huisstijl", description: "Kleurenpalet, logo en organisatienaam instellen", icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01", color: "bg-pink-50 border-pink-200", iconBg: "bg-pink-600" },
  { to: "/admin/documenten", label: "Documenten", description: "Organisatiedocumenten uploaden en beheren", icon: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z", color: "bg-yellow-50 border-yellow-200", iconBg: "bg-yellow-600" },
  { to: "/admin/output", label: "Output beheren", description: "Organisatieformats en AI-modules in één scherm", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z", color: "bg-purple-50 border-purple-200", iconBg: "bg-purple-600" },
];

const AdminDashboardPage: React.FC = () => (
  <div className="max-w-4xl mx-auto">
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-900">Beheerder Panel</h1>
      <p className="text-gray-500 mt-1">Beheer alle instellingen van de Zorg AI Assistent</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {adminCards.map((card) => (
        <Link key={card.to} to={card.to}
          className={`group flex items-start gap-4 p-5 bg-white border rounded-xl hover:shadow-md transition-all ${card.color}`}>
          <div className={`w-12 h-12 ${card.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-base group-hover:text-purple-700 transition-colors">{card.label}</h3>
            <p className="text-gray-500 text-sm mt-0.5">{card.description}</p>
          </div>
          <svg className="w-5 h-5 text-gray-300 group-hover:text-purple-500 flex-shrink-0 mt-0.5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      ))}
    </div>
  </div>
);

export default AdminDashboardPage;
