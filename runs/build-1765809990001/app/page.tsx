export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center h-[60vh] text-center">
      <h1 className="text-4xl font-bold mb-4">Welkom bij Padelbaan SaaS</h1>
      <p className="text-lg text-gray-600 mb-8">Beheer eenvoudig je padelbanen, reserveringen en betalingen.</p>
      <a href="/login" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Inloggen</a>
    </section>
  );
}

