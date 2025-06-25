const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');
const {
  getAllProviders,
  getAllBookings,
  getAllServices,
  rejectService,
  approveService
} = require('../controllers/adminController');
const requireAdmin = require('../middleware/requireAdmin');

router.use(requireAuth);  // must be placed before any route

router.get('/services',requireAuth, requireAdmin, getAllServices);
router.patch('/services/:id/approve', requireAdmin, approveService);
router.patch('/services/:id/reject',requireAuth, requireAdmin, rejectService);
router.get('/providers', requireAdmin, getAllProviders);
router.get('/bookings', requireAdmin, getAllBookings);


module.exports = router;
