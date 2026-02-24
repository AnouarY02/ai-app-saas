import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Inloggen mislukt. Controleer uw gegevens.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl mb-4">
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Zorg AI Assistent</h1>
        <p className="text-gray-500 mt-1 text-sm">Log in met uw account</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">E-mailadres</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="uw@email.nl" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Wachtwoord</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Uw wachtwoord" />
        </div>
        <button type="submit" disabled={loading}
          className="w-full py-2.5 px-4 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">
          {loading ? "Inloggen..." : "Inloggen"}
        </button>
      </form>

      <div className="mt-5 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-500">
        <p className="font-medium text-gray-600 mb-1">Demo accounts:</p>
        <p>Beheerder: admin@zorgai.nl / Admin123!</p>
        <p>Medewerker: anna@zorgai.nl / Medewerker123!</p>
      </div>
    </div>
  );
};

export default LoginPage;
