const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');
const User = require('../models/User');

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Authenticated user route (/me)
router.get('/me', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error('Error in /me route:', err);
    res.status(500).json({ message: 'Failed to fetch user info' });
  }
});

module.exports = router;
