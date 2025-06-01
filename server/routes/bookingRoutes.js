const express = require('express');
const router = express.Router();
const { bookService, getMyBookings, getProviderAppointments } = require('../controllers/bookingController');
const { requireAuth } = require('../middleware/authMiddleware');

router.post('/', requireAuth, bookService); // users
router.get('/me', requireAuth, getMyBookings);
router.get('/appointments', requireAuth, getProviderAppointments); // providers

module.exports = router;
