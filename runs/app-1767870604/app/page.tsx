import { redirect } from 'next/navigation';
import { getUserFromSession } from '../lib/auth/session';

export default async function HomePage() {
  const user = await getUserFromSession();
  if (user) {
    redirect('/dashboard');
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Task Manager Pro</h1>
      <p className="mb-6 text-lg">Beheer je taken en projecten met moderne kanban boards.</p>
      <div className="flex gap-4">
        <a href="/login" className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">Inloggen</a>
        <a href="/register" className="px-4 py-2 border border-primary text-primary rounded hover:bg-primary/10">Registreren</a>
      </div>
    </main>
  );
}

