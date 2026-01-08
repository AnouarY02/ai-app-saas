import RegisterForm from '../../components/auth/register-form';

export default function RegisterPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6">Registreren</h2>
        <RegisterForm />
      </div>
    </main>
  );
}

