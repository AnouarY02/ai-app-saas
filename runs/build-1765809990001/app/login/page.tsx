import { AuthForm } from '../../components/auth/auth-form';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-2xl font-semibold mb-6">Inloggen</h2>
      <AuthForm />
    </div>
  );
}

