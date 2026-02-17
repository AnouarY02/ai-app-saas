import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getUser, updateUser } from '@/utils/apiClient';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Alert from '@/components/ui/Alert';
import Card from '@/components/ui/Card';

const UserEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getUser(id);
        setFormData({
          name: data.name || '',
          email: data.email || '',
        });
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Failed to load user.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    try {
      setSaving(true);
      setError(null);
      await updateUser(id, formData);
      navigate(`/dashboard/users/${id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to update user.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-neutral-500">
        <Link to="/dashboard/users" className="hover:text-brand-primary-500">Users</Link>
        <span className="mx-2">/</span>
        <Link to={`/dashboard/users/${id}`} className="hover:text-brand-primary-500">{formData.name || 'User'}</Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-900">Edit</span>
      </nav>

      <Card>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Edit User</h1>
          <p className="text-neutral-500 mb-6">Update the user information below.</p>

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

            <div className="flex items-center gap-3 pt-4">
              <Button
                type="submit"
                disabled={saving}
                className="bg-brand-primary-500 hover:bg-brand-primary-600 rounded-lg disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Link
                to={`/dashboard/users/${id}`}
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

export default UserEditPage;
