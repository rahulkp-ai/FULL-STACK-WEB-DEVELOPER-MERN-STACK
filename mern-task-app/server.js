require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const Task = require('./models/Task');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- API Routes ---

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create a task
app.post('/api/tasks', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update a task (toggle completion or update title)
app.patch('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- Database Connection & Server Start ---
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully.');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });