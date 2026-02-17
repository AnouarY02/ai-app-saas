import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createInsight } from '@/utils/apiClient';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Label from '@/components/ui/Label';
import Alert from '@/components/ui/Alert';
import Card from '@/components/ui/Card';

const InsightCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await createInsight(formData);
      navigate('/dashboard/insights');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to create insight.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-neutral-500">
        <Link to="/dashboard/insights" className="hover:text-brand-primary-500">Insights</Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-900">New Insight</span>
      </nav>

      <Card>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Create New Insight</h1>
          <p className="text-neutral-500 mb-6">Capture a new insight with the details below.</p>

          {error && (
            <div className="mb-6">
              <Alert type="error" message={error} />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="title">Title</Label>
              <div className="mt-1">
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter a descriptive title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <div className="mt-1">
                <Input
                  id="category"
                  name="category"
                  type="text"
                  placeholder="e.g., Analytics, Performance, Growth"
                  value={formData.category}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <div className="mt-1">
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Write the insight content here..."
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={8}
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-brand-primary-500 hover:bg-brand-primary-600 rounded-lg disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Insight'}
              </Button>
              <Link
                to="/dashboard/insights"
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

export default InsightCreatePage;
