import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUser } from '@/utils/apiClient';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Alert from '@/components/ui/Alert';
import Card from '@/components/ui/Card';

const UserCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await createUser(formData);
      navigate('/dashboard/users');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to create user.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-neutral-500">
        <Link to="/dashboard/users" className="hover:text-brand-primary-500">Users</Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-900">Create User</span>
      </nav>

      <Card>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Create New User</h1>
          <p className="text-neutral-500 mb-6">Fill in the details below to add a new user to your workspace.</p>

          {error && (
            <div className="mb-6">
              <Alert type="error" message={error} />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <div className="mt-1">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="mt-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter a secure password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
              </div>
              <p className="text-xs text-neutral-400 mt-1">Minimum 6 characters.</p>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-brand-primary-500 hover:bg-brand-primary-600 rounded-lg disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create User'}
              </Button>
              <Link
                to="/dashboard/users"
                className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default UserCreatePage;
