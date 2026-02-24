import React from "react";
import { Link } from "react-router-dom";

const features = [
  { icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", title: "Rapportage", desc: "Genereer in seconden professionele dagrapportages voor uw clienten." },
  { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01", title: "Zorgplan", desc: "Stel complete, op maat gemaakte zorgplannen op met AI-ondersteuning." },
  { icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", title: "Risicosignalering", desc: "Identificeer en documenteer risico's bij clienten systematisch en volledig." },
  { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "Signaleringsplan", desc: "Maak professionele signalerings- en crisisplannen voor kwetsbare clienten." },
];

const HomePage: React.FC = () => (
  <div>
    {/* Hero */}
    <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white bg-opacity-20 rounded-full text-sm font-medium mb-6">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          AI-ondersteuning voor de zorg
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
          Minder tijd aan papierwerk,<br />meer tijd voor uw clienten
        </h1>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Zorg AI Assistent helpt zorgprofessionals bij het opstellen van rapportages, zorgplannen, risicosignaleringen en signaleringsplannen â€” in seconden.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/login" className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors">
            Inloggen
          </Link>
          <Link to="/register" className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-400 transition-colors border border-blue-400">
            Gratis proberen
          </Link>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Alles wat uw team nodig heeft</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <div key={f.title} className="p-6 border border-gray-200 rounded-2xl hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={f.icon} />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Klaar om te beginnen?</h2>
        <p className="text-gray-500 mb-6">Meld u aan en ervaar hoe AI uw zorgdocumentatie transformeert.</p>
        <Link to="/register" className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
          Gratis aan de slag
        </Link>
      </div>
    </section>
  </div>
);

export default HomePage;
