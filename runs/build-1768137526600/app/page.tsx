import LoginForm from '../components/auth/login-form';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Padel Credits & Booking</h1>
      <p className="mb-8 text-gray-600">Boek je padelbaan en beheer je credits eenvoudig.</p>
      <LoginForm />
    </main>
  );
}

