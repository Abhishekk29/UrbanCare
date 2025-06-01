const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); // ✅ Required!
const {
  bookService,
  getMyBookings,
  getProviderAppointments,
  updateBookingStatus
} = require('../controllers/bookingController');
const { requireAuth } = require('../middleware/authMiddleware');

router.post('/', requireAuth, bookService);
router.get('/me', requireAuth, getMyBookings);
router.get('/appointments', requireAuth, getProviderAppointments);
router.put('/:id/status', requireAuth, updateBookingStatus);


router.get('/check', requireAuth, async (req, res) => {
  const { serviceId, date, time } = req.query;
  try {
    const exists = await Booking.findOne({ serviceId, date, time });
    res.json({ exists: !!exists });
  } catch (err) {
    console.error('Check route error:', err); // Debug line
    res.status(500).json({ message: 'Validation error' });
  }
});

module.exports = router;
