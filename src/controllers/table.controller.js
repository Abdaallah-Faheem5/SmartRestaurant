const { tables, orders } = require('../data/mockData');

class TableController {
  // Get all tables 
  getAllTables(req, res) {
    try {
      const { status } = req.query;
      
      let filteredTables = [...tables];
      
      if (status) {
        filteredTables = filteredTables.filter(t => t.status === status);
      }

      
      filteredTables = filteredTables.map(table => {
        if (table.currentOrderId) {
          const order = orders.find(o => o.id === table.currentOrderId);
          return { ...table, currentOrder: order || null };
        }
        return table;
      });

      res.json({
        success: true,
        count: filteredTables.length,
        data: filteredTables
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ',
        error: error.message
      });
    }
  }

  // Get table by ID
  getTableById(req, res) {
    try {
      const table = tables.find(t => t.id === parseInt(req.params.id));
      
      if (!table) {
        return res.status(404).json({
          success: false,
          message: 'الطاولة غير موجودة'
        });
      }

      
      if (table.currentOrderId) {
        const order = orders.find(o => o.id === table.currentOrderId);
        table.currentOrder = order || null;
      }

      res.json({
        success: true,
        data: table
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ',
        error: error.message
      });
    }
  }

  // Update table status
  updateTableStatus(req, res) {
    try {
      const tableId = parseInt(req.params.id);
      const { status } = req.body;

      const validStatuses = ['available', 'occupied', 'reserved'];
      
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'حالة غير صالحة'
        });
      }

      const table = tables.find(t => t.id === tableId);

      if (!table) {
        return res.status(404).json({
          success: false,
          message: 'الطاولة غير موجودة'
        });
      }

      table.status = status;

      res.json({
        success: true,
        message: 'تم تحديث حالة الطاولة',
        data: table
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

module.exports = new TableController();