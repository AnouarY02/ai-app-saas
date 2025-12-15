import { RegisterForm } from '../../components/auth/register-form';

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto mt-12">
      <h2 className="text-2xl font-semibold mb-6">Registreren</h2>
      <RegisterForm />
    </div>
  );
}

