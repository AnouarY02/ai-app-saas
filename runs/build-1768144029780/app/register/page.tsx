import { RegisterForm } from "../../components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto mt-16">
      <h1 className="text-xl font-bold mb-4">Registreren</h1>
      <RegisterForm />
    </div>
  );
}

