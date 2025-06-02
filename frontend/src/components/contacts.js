import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './contacts.css';

const Contacts = () => {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    totalSpend: '',
    visits: '',
    lastPurchaseDate: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/customers')
      .then(res => res.json())
      .then(data => setContacts(data))
      .catch(err => console.error('Error fetching contacts:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      totalSpend: parseFloat(formData.totalSpend) || 0,
      visits: parseInt(formData.visits) || 0,
      lastPurchaseDate: formData.lastPurchaseDate ? new Date(formData.lastPurchaseDate) : null
    };

    try {
      const response = await fetch('http://localhost:4000/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (response.ok) {
        setContacts([...contacts, data.customer]);
        setFormData({
          name: '',
          email: '',
          phone: '',
          totalSpend: '',
          visits: '',
          lastPurchaseDate: ''
        });
      } else {
        alert('Failed to add contact: ' + data.error);
      }
    } catch (err) {
      alert('Error adding contact: ' + err.message);
    }
  };

  const handleEdit = (contact) => {
    setEditingId(contact._id);
    setFormData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      totalSpend: contact.totalSpend || '',
      visits: contact.visits || '',
      lastPurchaseDate: contact.lastPurchaseDate ? contact.lastPurchaseDate.slice(0, 10) : ''
    });
  };

  return (
    <div className="contacts-container">
      <button
        onClick={() => navigate('/')}
        style={{
          marginBottom: '20px',
          padding: '8px 16px',
          backgroundColor: '#001f4d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        ← Back to Dashboard
      </button>

      <h1>Contacts</h1>

      <form onSubmit={handleAddOrUpdate} className="contact-form">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="input-field" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input-field" />
        <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="input-field" />
        <input type="number" name="totalSpend" placeholder="Total Spend" value={formData.totalSpend} onChange={handleChange} className="input-field" />
        <input type="number" name="visits" placeholder="Visits" value={formData.visits} onChange={handleChange} className="input-field" />
        <input type="date" name="lastPurchaseDate" value={formData.lastPurchaseDate} onChange={handleChange} className="input-field" />
        <button type="submit" className="submit-btn">{editingId ? 'Update' : 'Add'} Contact</button>
      </form>

      {contacts.length === 0 ? (
        <p className="no-contacts">No contacts yet.</p>
      ) : (
        <table className="contacts-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Total Spend</th>
              <th>Visits</th>
              <th>Last Purchase</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.totalSpend}</td>
                <td>{contact.visits}</td>
                <td>{contact.lastPurchaseDate ? new Date(contact.lastPurchaseDate).toLocaleDateString() : '-'}</td>
                <td>
                  <button className="action-btn edit-btn" onClick={() => handleEdit(contact)}>✏️ Edit</button>
                  <button className="action-btn delete-btn" onClick={() => alert('Delete coming soon!')}>🗑 Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Contacts;
