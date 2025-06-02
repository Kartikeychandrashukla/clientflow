import React, { useState } from 'react';
import axios from 'axios';
import './AiSegment.css';

function AiSegment() {
  const [prompt, setPrompt] = useState('');
  const [rules, setRules] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:4000/api/ai/segment', { prompt });
      setRules(res.data.rules);
    } catch (err) {
      setError('Failed to generate rules.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="component-container">
      <h2>AI Audience Segmentation</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter marketing prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Rules'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}
      {rules && (
        <>
          <h3>Generated Rules:</h3>
          <pre>{rules}</pre>
        </>
      )}
    </div>
  );
}

export default AiSegment;
