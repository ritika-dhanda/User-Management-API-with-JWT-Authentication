const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');

// Create Task
const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    res.status(400);
    throw new Error('Title is required');
  }

  const task = await Task.create({ user: req.user.id, title, description });
  res.status(201).json(task);
});

// Get all tasks
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.status(200).json(tasks);
});

// Get task by ID
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }
  res.status(200).json(task);
});

// Update task
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  task.status = req.body.status || task.status;

  const updatedTask = await task.save();
  res.status(200).json(updatedTask);
});

// Delete task
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await task.remove();
  res.status(200).json({ message: 'Task removed' });
});

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
