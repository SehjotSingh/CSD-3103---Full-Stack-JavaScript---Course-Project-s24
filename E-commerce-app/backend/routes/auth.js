const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET_KEY = 'your_secret_key'; // Use an environment variable in production

//register user
router.post('/register', async (req, res) => {
    const { fullName, email, password, address } = req.body;
    try {
        let user = new User({ fullName, email, password, address });
        await user.save();
        res.status(200).json({ msg: 'User registered successfully' });
    } catch (error) {
        console.error('Server error:', error);
        if (error.code === 11000) {  // Duplicate key error
            return res.status(400).json({ msg: 'User already exists' });
        }
        res.status(500).json({ msg: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }
        if (user.password !== password) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        res.status(200).json({ msg: 'Login successful' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});


module.exports = router;
