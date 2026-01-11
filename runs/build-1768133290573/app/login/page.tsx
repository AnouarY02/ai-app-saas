import { AuthForm } from '../../components/auth/auth-form';
import { getSessionUser } from '../../lib/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const user = await getSessionUser();
  if (user) {
    redirect('/dashboard');
  }
  return (
    <section className="max-w-sm mx-auto mt-16">
      <h2 className="text-2xl font-bold mb-6">Inloggen</h2>
      <AuthForm mode="login" />
    </section>
  );
}

