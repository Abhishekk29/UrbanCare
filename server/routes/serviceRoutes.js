const express = require('express');
const router = express.Router();
const {
  getAllServices,
  getMyServices,
  createService,
  updateService,
  deleteService
} = require('../controllers/serviceController');

const { requireAuth } = require('../middleware/authMiddleware');

// ✅ Public route: fetch all approved & non-rejected services (used in Home.jsx)
router.get('/', getAllServices);

// ✅ Authenticated routes (for service providers)
router.get('/my', requireAuth, getMyServices);
router.post('/', requireAuth, createService);
router.put('/:id', requireAuth, updateService);
router.delete('/:id', requireAuth, deleteService);

module.exports = router;
