import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import axios from 'axios';

import Dashboard from './components/dashboard';
import Contacts from './components/contacts';
import Deals from './components/deals';
import Tasks from './components/tasks';
import Campaigns from './components/Campaigns';

// AI Segment component inside this file for simplicity
function AiSegment() {
  const [prompt, setPrompt] = useState('');
  const [rules, setRules] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post('http://localhost:4000/api/ai/segment', { prompt });
      setRules(res.data.rules);
    } catch (err) {
      setError('Failed to generate rules.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-segment-container">
      <h2>AI Audience Segment Generator</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          placeholder="Enter marketing prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Rules'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {rules && (
        <div style={{ marginTop: 20 }}>
          <h3>Generated Rules:</h3>
          <pre>{rules}</pre>
        </div>
      )}
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async (attempts = 0) => {
      try {
        const res = await fetch('http://localhost:4000/auth/user', {
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        if (attempts < 3) {
          setTimeout(() => fetchProfile(attempts + 1), 500);
        } else {
          setUser(null);
        }
      }
    };

    fetchProfile();
  }, []);

  const handleLogin = () => {
    window.location.href = 'http://localhost:4000/auth/google?redirect_to=/dashboard';
  };

  const handleLogout = () => {
    fetch('http://localhost:4000/auth/logout', {
      method: 'GET',
      credentials: 'include',
    }).then(() => setUser(null));
  };

  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', backgroundColor: '#001f4d' }}>
        <Link to="/dashboard" style={{ marginRight: 10, color: 'white', textDecoration: 'none' }}>Dashboard</Link>
        <Link to="/contacts" style={{ marginRight: 10, color: 'white', textDecoration: 'none' }}>Contacts</Link>
        <Link to="/deals" style={{ marginRight: 10, color: 'white', textDecoration: 'none' }}>Deals</Link>
        <Link to="/tasks" style={{ marginRight: 10, color: 'white', textDecoration: 'none' }}>Tasks</Link>
        <Link to="/campaigns" style={{ marginRight: 10, color: 'white', textDecoration: 'none' }}>Campaigns</Link>
        <Link to="/ai-segment" style={{ marginRight: 10, color: 'white', textDecoration: 'none' }}>AI Segment</Link>
        <Link to="/add" style={{ marginRight: 10, color: 'white', textDecoration: 'none' }}>Add New</Link>

        {!user && (
          <button onClick={handleLogin} style={{ marginLeft: 20, cursor: 'pointer' }}>
            Login with Google
          </button>
        )}
        {user && (
          <>
            <span style={{ marginLeft: 20, color: 'white' }}>Hello, {user.displayName}</span>
            <button onClick={handleLogout} style={{ marginLeft: 10, cursor: 'pointer' }}>
              Logout
            </button>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/login" element={<div>Please log in to continue.</div>} />

        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/contacts" element={<PrivateRoute><Contacts /></PrivateRoute>} />
        <Route path="/deals" element={<PrivateRoute><Deals /></PrivateRoute>} />
        <Route path="/tasks" element={<PrivateRoute><Tasks /></PrivateRoute>} />
        <Route path="/campaigns" element={<PrivateRoute><Campaigns /></PrivateRoute>} />

        {/* New AI Segment route */}
        <Route path="/ai-segment" element={<PrivateRoute><AiSegment /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
