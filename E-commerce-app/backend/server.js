const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./data/db');
const authRoutes = require('./routes/auth');

const app = express();

// Connect Database
connectDB().then(() => {
    console.log('Connected to MongoDB');
});

// Init Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// Define Routes
app.use('/api/users', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
