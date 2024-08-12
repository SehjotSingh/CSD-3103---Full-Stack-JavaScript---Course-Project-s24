const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

const JWT_SECRET = 'your_secret_key_here'; // Replace with your own secret key

// Registration
router.post(
    '/register',
    [
        check('firstName', 'First name is required').not().isEmpty(),
        check('lastName', 'Last name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { firstName, lastName, email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ msg: 'User already exists' });
            }

            user = new User({
                firstName,
                lastName,
                email,
                password,
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                JWT_SECRET,
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'strict',
                    });
                    res.status(201).json({ token, user });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);


router.post('/login', async (req, res) => {
    const { email, password, stayLoggedIn } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: stayLoggedIn ? '7d' : '1h',
        });

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
        };

        if (stayLoggedIn) {
            cookieOptions.maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
        }

        res.cookie('token', token, cookieOptions);
        res.json({ token, user: { id: user._id, email: user.email } });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Logout
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ msg: 'Logged out' });
});

// Check auth
router.get('/auth', async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        console.log('No token found'); // Debugging log
        return res.status(401).json({ msg: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            console.log('No user found'); // Debugging log
            return res.status(401).json({ msg: 'Unauthorized' });
        }
        console.log('User found:', user); // Debugging log
        res.json({ user });
    } catch (err) {
        console.log('Error verifying token:', err); // Debugging log
        res.status(401).json({ msg: 'Unauthorized' });
    }
});

module.exports = router;
