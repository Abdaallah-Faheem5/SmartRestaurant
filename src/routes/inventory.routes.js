const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

router.use(authenticate);
router.use(authorize('manager'));

router.get('/', inventoryController.getAllInventory);
router.get('/low-stock', inventoryController.getLowStock);
router.put('/:id', inventoryController.updateInventory);

module.exports = router;