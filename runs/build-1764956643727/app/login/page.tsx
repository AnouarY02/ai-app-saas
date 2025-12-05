import { AuthForm } from '../../components/auth/auth-form';

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-16">
      <h2 className="text-2xl font-semibold mb-6">Inloggen</h2>
      <AuthForm mode="login" />
    </div>
  );
}

