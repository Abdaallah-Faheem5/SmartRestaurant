const { inventory } = require('../data/mockData');

class InventoryController {
  // Get all inventory items
  getAllInventory(req, res) {
    try {
      res.json({
        success: true,
        count: inventory.length,
        data: inventory
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ',
        error: error.message
      });
    }
  }

  // Get low stock items
  getLowStock(req, res) {
    try {
      const lowStockItems = inventory.filter(item => item.quantity <= item.minimumQuantity);
      
      res.json({
        success: true,
        count: lowStockItems.length,
        data: lowStockItems
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ',
        error: error.message
      });
    }
  }

  // Update inventory item
  updateInventory(req, res) {
    try {
      const itemId = parseInt(req.params.id);
      const { quantity } = req.body;

      const item = inventory.find(i => i.id === itemId);

      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'العنصر غير موجود'
        });
      }

      if (quantity !== undefined) {
        item.quantity = parseFloat(quantity);
        item.lastRestocked = new Date();
      }

      res.json({
        success: true,
        message: 'تم تحديث المخزون',
        data: item
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ',
        error: error.message
      });
    }
  }
}

module.exports = new InventoryController();