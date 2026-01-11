import { redirect } from 'next/navigation';
import { getSessionUser } from '../lib/auth';

export default async function HomePage() {
  const user = await getSessionUser();
  if (user) {
    redirect('/dashboard');
  }
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-4">Welkom bij Nieuw App Idee</h1>
      <p className="mb-6 text-gray-600 text-center max-w-md">
        Een eenvoudige SaaS-applicatie om je taken te beheren en productiviteit te verhogen. Log in of registreer om te starten.
      </p>
      <div className="flex gap-4">
        <a href="/login" className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">Inloggen</a>
        <a href="/register" className="px-4 py-2 border border-primary text-primary rounded hover:bg-primary/10">Registreren</a>
      </div>
    </section>
  );
}

