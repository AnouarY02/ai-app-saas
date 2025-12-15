import RegisterForm from '../../components/auth/register-form';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Registreren</h1>
        <RegisterForm />
      </div>
    </div>
  );
}

