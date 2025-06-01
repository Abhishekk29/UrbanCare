const express = require('express');
const router = express.Router();
const { getAllServices, createService,updateService,deleteService } = require('../controllers/serviceController');
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/', getAllServices);            // ✅ function exists
router.post('/', requireAuth, createService);
router.put('/:id', requireAuth, updateService);
router.delete('/:id', requireAuth, deleteService);

module.exports = router;
