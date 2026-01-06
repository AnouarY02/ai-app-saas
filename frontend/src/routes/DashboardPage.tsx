import React, { useEffect, useState } from 'react';
import { createAIRequest, listAIRequests } from '../utils/apiClient';
import { AIRequest } from '../types/apiTypes';
import './DashboardPage.css';

const DashboardPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [requests, setRequests] = useState<AIRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listAIRequests();
      setRequests(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await createAIRequest(input);
      setInput('');
      await fetchRequests();
    } catch (err: any) {
      setError(err.message || 'Failed to submit AI request');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="dashboard-root">
      <h1>AI Dashboard</h1>
      <form className="ai-form" onSubmit={handleSubmit}>
        <label>
          Enter your prompt:
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            required
            disabled={submitting}
          />
        </label>
        <button type="submit" className="primary-btn" disabled={submitting || !input}>
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {error && <div className="form-error">{error}</div>}
      <section className="ai-requests-section">
        <h2>History</h2>
        {loading ? (
          <div>Loading requests...</div>
        ) : requests.length === 0 ? (
          <div>No AI requests yet.</div>
        ) : (
          <ul className="ai-requests-list">
            {requests.map((req) => (
              <li key={req.id} className={`ai-request-item status-${req.status}`}>
                <div><strong>Prompt:</strong> {req.input}</div>
                <div><strong>Status:</strong> {req.status}</div>
                {req.status === 'completed' && (
                  <div><strong>Output:</strong> {req.output}</div>
                )}
                <div className="ai-request-meta">{new Date(req.createdAt).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default DashboardPage;
