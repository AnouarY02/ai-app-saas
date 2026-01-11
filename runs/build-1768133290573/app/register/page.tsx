import { AuthForm } from '../../components/auth/auth-form';
import { getSessionUser } from '../../lib/auth';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
  const user = await getSessionUser();
  if (user) {
    redirect('/dashboard');
  }
  return (
    <section className="max-w-sm mx-auto mt-16">
      <h2 className="text-2xl font-bold mb-6">Registreren</h2>
      <AuthForm mode="register" />
    </section>
  );
}

