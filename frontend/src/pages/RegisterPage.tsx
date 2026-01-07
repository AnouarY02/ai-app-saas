import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";
import FormField from "../components/FormField";
import Notification from "../components/Notification";
import { useAuth } from "../state/AuthContext";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  name: z.string().min(2, { message: "Name required" })
});

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string }>({});
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
    const result = registerSchema.safeParse(form);
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
      await register(form.email, form.password, form.name);
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      setApiError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit} autoComplete="on">
      <h2>Register</h2>
      <FormField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        error={errors.name}
        autoComplete="name"
      />
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
        autoComplete="new-password"
      />
      <Button type="submit" loading={loading} style={{ width: "100%" }}>
        Register
      </Button>
      <div style={{ marginTop: 12 }}>
        Already have an account? <Link to="/login">Login</Link>
      </div>
      <Notification message={apiError} type="error" />
    </form>
  );
};

export default RegisterPage;
