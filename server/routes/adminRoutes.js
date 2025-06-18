const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');
const {
  getAllServices,
  updateServiceStatus,
  getAllProviders,
  getAllBookings
} = require('../controllers/adminController');

// Make all routes protected
router.use(requireAuth);

router.get('/services', getAllServices);
router.put('/services/:id/status', updateServiceStatus);

router.get('/providers', getAllProviders);
router.get('/bookings', getAllBookings);

module.exports = router;
