const Task = require('../models/task');

// GET all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: err.message });
  }
};

// POST new task
exports.createTask = async (req, res) => {
  try {
    const { title, assignedTo, dueDate, status, priority } = req.body;
    const newTask = new Task({ title, assignedTo, dueDate, status, priority });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create task', error: err.message });
  }
};
