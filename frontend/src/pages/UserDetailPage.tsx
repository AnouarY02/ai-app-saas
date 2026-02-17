import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getUser, deleteUser } from '@/utils/apiClient';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import Card from '@/components/ui/Card';

const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getUser(id);
        setUser(data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Failed to load user.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    if (!id || !window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    try {
      setDeleting(true);
      await deleteUser(id);
      navigate('/dashboard/users');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to delete user.');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <Alert type="error" message={error} />
        <div className="mt-4">
          <Link to="/dashboard/users" className="text-brand-primary-500 hover:underline text-sm">
            Back to Users
          </Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <Alert type="error" message="User not found." />
        <div className="mt-4">
          <Link to="/dashboard/users" className="text-brand-primary-500 hover:underline text-sm">
            Back to Users
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-neutral-500">
        <Link to="/dashboard/users" className="hover:text-brand-primary-500">Users</Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-900">{user.name || 'User Detail'}</span>
      </nav>

      <Card>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-brand-primary-100 rounded-full flex items-center justify-center text-brand-primary-600 font-bold text-2xl">
                {(user.name || user.email || '?').charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-neutral-900">{user.name || 'Unnamed User'}</h1>
                <p className="text-neutral-500">{user.email}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to={`/dashboard/users/${id}/edit`}>
                <Button className="bg-brand-primary-500 hover:bg-brand-primary-600 rounded-lg">
                  Edit
                </Button>
              </Link>
              <Button
                variant="secondary"
                onClick={handleDelete}
                disabled={deleting}
                className="bg-red-500 hover:bg-red-600 text-white rounded-lg disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                Name
              </label>
              <p className="text-neutral-900">{user.name || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                Email
              </label>
              <p className="text-neutral-900">{user.email || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                Role
              </label>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-primary-100 text-brand-primary-700">
                {user.role || 'user'}
              </span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                Created
              </label>
              <p className="text-neutral-900">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-6">
        <Link to="/dashboard/users" className="text-sm text-brand-primary-500 hover:underline">
          &larr; Back to Users
        </Link>
      </div>
    </div>
  );
};

export default UserDetailPage;
