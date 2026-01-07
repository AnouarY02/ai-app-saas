import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Button from "../components/Button";
import FormField from "../components/FormField";
import Notification from "../components/Notification";
import { useAuth } from "../state/AuthContext";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" })
});

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
    setApiError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    const result = loginSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: any = {};
      for (const err of result.error.errors) {
        fieldErrors[err.path[0]] = err.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setLoading(true);
    try {
      await login(form.email, form.password);
      const from = (location.state as any)?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } catch (err: any) {
      setApiError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit} autoComplete="on">
      <h2>Login</h2>
      <FormField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
        autoComplete="email"
      />
      <FormField
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        error={errors.password}
        autoComplete="current-password"
      />
      <Button type="submit" loading={loading} style={{ width: "100%" }}>
        Login
      </Button>
      <div style={{ marginTop: 12 }}>
        Don't have an account? <Link to="/register">Register</Link>
      </div>
      <Notification message={apiError} type="error" />
    </form>
  );
};

export default LoginPage;
