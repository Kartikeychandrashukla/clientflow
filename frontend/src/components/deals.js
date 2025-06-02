// src/pages/Deals.js
import React, { useState, useEffect } from 'react';
import './deals.css';
import { Link } from 'react-router-dom';

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    customer: '',
    value: '',
    stage: '',
    expectedClose: ''
  });

  const fetchDeals = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/deals');
      const data = await res.json();
      setDeals(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/api/deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const newDeal = await res.json();
      setDeals([...deals, newDeal]);
      setFormData({ title: '', customer: '', value: '', stage: '', expectedClose: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="deals-container">
      <Link to="/" className="back-button">← Back to Dashboard</Link>

      <h1>Deals</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Deal Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          name="customer"
          placeholder="Customer Name"
          value={formData.customer}
          onChange={handleChange}
          required
        />
        <input
          name="value"
          placeholder="Deal Value"
          value={formData.value}
          onChange={handleChange}
          required
        />
        <input
          name="stage"
          placeholder="Stage (e.g. Proposal)"
          value={formData.stage}
          onChange={handleChange}
          required
        />
        <input
          name="expectedClose"
          type="date"
          placeholder="Expected Close Date"
          value={formData.expectedClose}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Deal</button>
      </form>

      {deals.length === 0 ? (
        <p className="no-deals">No deals yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Customer</th>
              <th>Value</th>
              <th>Stage</th>
              <th>Expected Close</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal, index) => (
              <tr key={index}>
                <td>{deal.title}</td>
                <td>{deal.customer}</td>
                <td>{deal.value}</td>
                <td>{deal.stage}</td>
                <td>{deal.expectedClose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Deals;
