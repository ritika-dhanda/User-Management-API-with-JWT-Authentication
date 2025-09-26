const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // create this file for MongoDB connection
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
