const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

// Public routes
router.get('/categories', menuController.getAllCategories);
router.get('/items', menuController.getAllMenuItems);
router.get('/items/:id', menuController.getMenuItemById);
router.get('/categories/:categoryId/items', menuController.getItemsByCategory);

// Protected routes (manager only)
router.post('/categories', authenticate, authorize('manager'), menuController.createCategory);
router.put('/categories/:id', authenticate, authorize('manager'), menuController.updateCategory);
router.delete('/categories/:id', authenticate, authorize('manager'), menuController.deleteCategory);

router.post('/items', authenticate, authorize('manager'), menuController.createMenuItem);
router.put('/items/:id', authenticate, authorize('manager'), menuController.updateMenuItem);
router.delete('/items/:id', authenticate, authorize('manager'), menuController.deleteMenuItem);
router.patch('/items/:id/availability', authenticate, authorize('manager'), menuController.toggleAvailability);

module.exports = router;