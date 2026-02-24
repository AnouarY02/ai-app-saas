import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const RegisterPage: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(form);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.message || "Registratie mislukt");
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
        <h1 className="text-2xl font-bold text-gray-900">Account aanmaken</h1>
        <p className="text-gray-500 mt-1 text-sm">Zorg AI Assistent</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Volledige naam</label>
          <input value={form.name} onChange={set("name")} required autoComplete="name"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Uw voor- en achternaam" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">E-mailadres</label>
          <input type="email" value={form.email} onChange={set("email")} required autoComplete="email"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="uw@email.nl" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Wachtwoord</label>
          <input type="password" value={form.password} onChange={set("password")} required minLength={6} autoComplete="new-password"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Minimaal 6 tekens" />
        </div>
        <button type="submit" disabled={loading}
          className="w-full py-2.5 px-4 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">
          {loading ? "Account aanmaken..." : "Account aanmaken"}
        </button>
      </form>
      <p className="text-center mt-4 text-sm text-gray-500">
        Al een account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline font-medium">Inloggen</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
