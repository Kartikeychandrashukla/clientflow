import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="greeting">Hello there!</h1>

      <div className="dashboard-grid">
        <Link to="/contacts" className="dashboard-card contacts-card">
          <h2>📇 Contacts</h2>
          <p>Manage your customer contact information.</p>
        </Link>

        <Link to="/deals" className="dashboard-card deals-card">
          <h2>💼 Deals</h2>
          <p>Track ongoing and closed deals.</p>
        </Link>

        <Link to="/tasks" className="dashboard-card tasks-card">
          <h2>✅ Tasks</h2>
          <p>Stay on top of your daily activities.</p>
        </Link>

        <Link to="/campaigns" className="dashboard-card campaigns-card">
          <h2>📢 Campaigns</h2>
          <p>Create and manage marketing campaigns.</p>
        </Link>

        <Link to="/add" className="dashboard-card add-card">
          <h2>➕ Add New</h2>
          <p>Quickly create a contact, deal, or task.</p>
        </Link>

        <Link to="/ai-segment" className="dashboard-card ai-segment-card">
          <h2>🤖 AI Segment</h2>
          <p>Generate smart audience segments using AI.</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
