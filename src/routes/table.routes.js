const express = require('express');
const router = express.Router();
const tableController = require('../controllers/table.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

router.get('/', tableController.getAllTables);
router.get('/:id', tableController.getTableById);
router.put('/:id/status', authenticate, authorize('manager', 'waiter'), tableController.updateTableStatus);

module.exports = router;