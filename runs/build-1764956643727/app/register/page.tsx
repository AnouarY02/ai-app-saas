import { AuthForm } from '../../components/auth/auth-form';

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto mt-16">
      <h2 className="text-2xl font-semibold mb-6">Registreren</h2>
      <AuthForm mode="register" />
    </div>
  );
}

