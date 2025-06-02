import React, { useState } from 'react';
import './Campaigns.css';
import { Link } from 'react-router-dom';

const Campaigns = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    rules: [{ field: 'orders', operator: '>', value: '' }]
  });

  const handleRuleChange = (index, e) => {
    const updatedRules = [...formData.rules];
    updatedRules[index][e.target.name] = e.target.value;
    setFormData({ ...formData, rules: updatedRules });
  };

  const addRule = () => {
    setFormData({
      ...formData,
      rules: [...formData.rules, { field: '', operator: '', value: '' }]
    });
  };

  const removeRule = (index) => {
    const updatedRules = formData.rules.filter((_, i) => i !== index);
    setFormData({ ...formData, rules: updatedRules });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/api/Campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert('✅ Campaign created successfully!');
        setFormData({
          name: '',
          message: '',
          rules: [{ field: 'orders', operator: '>', value: '' }]
        });
      } else {
        const data = await res.json();
        alert('❌ Failed to create campaign: ' + data.error);
      }
    } catch (err) {
      alert('❌ Server error: ' + err.message);
    }
  };

  return (
    <div className="campaigns-container">
      <Link to="/" className="back-button">← Back to Dashboard</Link>
      <h1>Create Campaign</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Campaign Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Message (e.g., Hello {{name}}, get 20% off...)"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <h3>Audience Rules</h3>
        {formData.rules.map((rule, index) => (
          <div className="rule-row" key={index}>
            <select
              name="field"
              value={rule.field}
              onChange={(e) => handleRuleChange(index, e)}
            >
              <option value="">Select Field</option>
              <option value="orders">Orders</option>
              <option value="deals.value">Deals Value</option>
              <option value="tasks.status">Task Status</option>
            </select>

            <select
              name="operator"
              value={rule.operator}
              onChange={(e) => handleRuleChange(index, e)}
            >
              <option value="">Operator</option>
              <option value=">">{'>'}</option>
              <option value="<">{'<'}</option>
              <option value="=">{'='}</option>
            </select>

            <input
              type="text"
              name="value"
              value={rule.value}
              onChange={(e) => handleRuleChange(index, e)}
              placeholder="Value"
              required
            />

            <button type="button" onClick={() => removeRule(index)}>❌</button>
          </div>
        ))}

        <button type="button" onClick={addRule}>➕ Add Rule</button>
        <br />
        <button type="submit" className="submit-btn">🚀 Create Campaign</button>
      </form>
    </div>
  );
};

export default Campaigns;
