const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// @desc    Get all users
// @route   GET /api/users
// @access  Protected
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}, '-password'); // exclude password
    res.json(users);
});

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Protected
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id, '-password');
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    res.json(user);
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Protected
const updateUser = asyncHandler(async (req, res) => {
    const { name, password } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    if (name) user.name = name;
    if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();
    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email
    });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Protected
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    await user.remove();
    res.json({ message: 'User removed' });
});

module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
};
