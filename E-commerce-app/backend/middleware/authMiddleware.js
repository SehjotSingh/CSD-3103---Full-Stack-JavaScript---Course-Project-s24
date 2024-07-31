const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_secret_key_here'; // Replace with your own secret key

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    console.log('Token:', token); // Debugging log
    if (!token) {
        console.log('No token found'); // Debugging log
        return res.status(401).json({ msg: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Decoded Token:', decoded); // Debugging log
        req.user = decoded;
        next();
    } catch (err) {
        console.log('Token verification failed:', err); // Debugging log
        res.status(401).json({ msg: 'Unauthorized' });
    }
};

module.exports = authMiddleware;
