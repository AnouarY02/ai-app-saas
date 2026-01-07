import React, { useState, useEffect } from 'react';
import Button from '../components/UI/Button';
import { useAuth } from '../state/AuthContext';
import { createAIInteraction, getAIHistory } from '../lib/api';

interface AIInteraction {
  id: string;
  userId: string;
  input: string;
  output: string;
  createdAt: string;
}

const AppPage: React.FC = () => {
  const { user } = useAuth();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [history, setHistory] = useState<AIInteraction[]>([]);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async () => {
    setHistoryLoading(true);
    try {
      const res = await getAIHistory();
      setHistory(res.interactions);
    } catch (err: any) {
      setError('Failed to load history');
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setOutput('');
    try {
      const res = await createAIInteraction(input);
      setOutput(res.output);
      setInput('');
      fetchHistory();
    } catch (err: any) {
      setError(err.message || 'AI interaction failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>AI Playground</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask the AI something..."
          style={{ padding: '0.7rem', width: '60%', marginRight: 12 }}
          required
        />
        <Button type="submit" loading={loading}>
          Send
        </Button>
      </form>
      {error && <div style={{ color: '#f87171', marginBottom: 12 }}>{error}</div>}
      {output && (
        <div style={{ background: '#f1f5f9', padding: 16, borderRadius: 6, marginBottom: 24 }}>
          <strong>AI Response:</strong>
          <div style={{ marginTop: 8 }}>{output}</div>
        </div>
      )}
      <h3>Interaction History</h3>
      {historyLoading ? (
        <div>Loading history...</div>
      ) : history.length === 0 ? (
        <div>No interactions yet.</div>
      ) : (
        <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
          {history.map(interaction => (
            <li key={interaction.id} style={{ marginBottom: 16, background: '#fff', padding: 12, borderRadius: 6, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div><strong>You:</strong> {interaction.input}</div>
              <div><strong>AI:</strong> {interaction.output}</div>
              <div style={{ fontSize: '0.9rem', color: '#64748b', marginTop: 4 }}>{new Date(interaction.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppPage;
