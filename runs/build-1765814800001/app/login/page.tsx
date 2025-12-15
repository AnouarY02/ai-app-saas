import LoginForm from '../../components/auth/login-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Inloggen</h1>
        <LoginForm />
      </div>
    </div>
  );
}

