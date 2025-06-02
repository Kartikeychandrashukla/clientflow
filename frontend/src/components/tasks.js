// src/pages/Tasks.js
import React, { useState, useEffect } from 'react';
import './tasks.css';
import { Link } from 'react-router-dom';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    assignedTo: '',
    dueDate: '',
    status: ''
  });

  const fetchTasks = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/tasks');
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const newTask = await res.json();
      setTasks([...tasks, newTask]);
      setFormData({ title: '', assignedTo: '', dueDate: '', status: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="tasks-container">
      <Link to="/" className="back-button">← Back to Dashboard</Link>

      <h1>Tasks</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          name="assignedTo"
          placeholder="Assigned To"
          value={formData.assignedTo}
          onChange={handleChange}
          required
        />
        <input
          name="dueDate"
          type="date"
          placeholder="Due Date"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />
        <input
          name="status"
          placeholder="Status (e.g. Pending, Completed)"
          value={formData.status}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Task</button>
      </form>

      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Assigned To</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.title}</td>
                <td>{task.assignedTo}</td>
                <td>{task.dueDate}</td>
                <td>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Tasks;
