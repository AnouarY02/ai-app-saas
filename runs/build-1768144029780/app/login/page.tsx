import { LoginForm } from "../../components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-16">
      <h1 className="text-xl font-bold mb-4">Inloggen</h1>
      <LoginForm />
    </div>
  );
}

