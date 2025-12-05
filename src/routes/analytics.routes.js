const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

router.use(authenticate);
router.use(authorize('manager'));

router.get('/sales', analyticsController.getSalesData);
router.get('/popular-items', analyticsController.getPopularItems);
router.get('/peak-hours', analyticsController.getPeakHours);
router.get('/dashboard', analyticsController.getDashboard);

module.exports = router;