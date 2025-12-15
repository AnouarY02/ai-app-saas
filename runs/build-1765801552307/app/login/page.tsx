import { LoginForm } from '../../components/auth/login-form';

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-12">
      <h2 className="text-2xl font-semibold mb-6">Inloggen</h2>
      <LoginForm />
    </div>
  );
}

