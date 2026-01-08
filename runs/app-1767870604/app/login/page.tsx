import LoginForm from '../../components/auth/login-form';

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6">Inloggen</h2>
        <LoginForm />
      </div>
    </main>
  );
}

