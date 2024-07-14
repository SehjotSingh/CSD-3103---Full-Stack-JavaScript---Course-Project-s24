const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
    const { fullName, email, password, address } = req.body;

    try {
        let user = new User({
            fullName,
            email,
            password,
            address
        });

        await user.save();
        res.status(200).json({ msg: 'User registered successfully' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        res.status(500).json({ msg: 'Server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    console.log('Received data:', req.body);

    try {
        let user = await User.findOne({ email });
        if (!user) {
            console.log('User does not exist');
            return res.status(400).json({ msg: 'User does not exist' });
        }

        if (user.password !== password) {
            console.log('Invalid credentials');
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        res.status(200).json({ msg: 'Login successful' });
    } catch (error) {
        console.log('Server error:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});


module.exports = router;
