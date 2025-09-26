const express = require('express');
const router = express.Router();
const { getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');

// Example middleware for protected routes (replace with real auth later)
const protect = (req, res, next) => {
    // For now, allow everything
    next();
};

// Routes
router.get('/', protect, getAllUsers);         // GET all users
router.get('/:id', protect, getUser);          // GET single user
router.put('/:id', protect, updateUser);       // UPDATE user
router.delete('/:id', protect, deleteUser);    // DELETE user

module.exports = router;
