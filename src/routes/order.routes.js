const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

// All routes require authentication
router.use(authenticate);

router.get('/', orderController.getAllOrders);
router.get('/history', orderController.getOrderHistory);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.createOrder);
router.put('/:id/status', orderController.updateOrderStatus);
router.delete('/:id', authorize('manager', 'waiter'), orderController.cancelOrder);
router.post('/:id/items', orderController.addItemsToOrder);
router.delete('/:id/items/:itemId', orderController.removeItemFromOrder);

module.exports = router;