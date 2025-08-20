const express = require('express');

const router = express.Router();

// Dummy user data for demonstration
const users = [
    { id: 1, username: 'user1', password: 'pass1' },
    { id: 2, username: 'user2', password: 'pass2' }
];

// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(
        u => u.username === username && u.password === password
    );
    if (user) {
        // In real apps, use JWT or session here
        res.json({ message: 'Login successful', userId: user.id });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = router;