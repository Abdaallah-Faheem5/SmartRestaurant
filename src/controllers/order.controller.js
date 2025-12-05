const { orders, orderHistory, menuItems, tables, getNextOrderId } = require('../data/mockData');

class OrderController {
  // Get all active orders
  getAllOrders(req, res) {
    try {
      const { status, tableId, waiterId } = req.query;
      
      let filteredOrders = [...orders];

      
      if (status) {
        filteredOrders = filteredOrders.filter(o => o.status === status);
      }

      
      if (tableId) {
        filteredOrders = filteredOrders.filter(o => o.tableId === parseInt(tableId));
      }

      
      if (waiterId) {
        filteredOrders = filteredOrders.filter(o => o.waiterId === parseInt(waiterId));
      }

      
      if (req.user.role === 'waiter') {
        filteredOrders = filteredOrders.filter(o => o.waiterId === req.user.id);
      }

      res.json({
        success: true,
        count: filteredOrders.length,
        data: filteredOrders
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ في جلب الطلبات',
        error: error.message
      });
    }
  }

  // Get order history
  getOrderHistory(req, res) {
    try {
      const { startDate, endDate, limit = 50 } = req.query;
      
      let history = [...orderHistory];

      
      if (startDate) {
        history = history.filter(o => new Date(o.createdAt) >= new Date(startDate));
      }
      if (endDate) {
        history = history.filter(o => new Date(o.createdAt) <= new Date(endDate));
      }

      
      history.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));

      
      history = history.slice(0, parseInt(limit));

      res.json({
        success: true,
        count: history.length,
        data: history
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ في جلب السجل',
        error: error.message
      });
    }
  }

  // Get order by ID
  getOrderById(req, res) {
    try {
      const orderId = parseInt(req.params.id);
      
      let order = orders.find(o => o.id === orderId);
      
      if (!order) {
        order = orderHistory.find(o => o.id === orderId);
      }

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'الطلب غير موجود'
        });
      }

      // Check permissions
      if (req.user.role === 'waiter' && order.waiterId !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'غير مصرح بعرض هذا الطلب'
        });
      }

      res.json({
        success: true,
        data: order
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ',
        error: error.message
      });
    }
  }

  // Create new order
  createOrder(req, res) {
    try {
      const { tableId, items, notes } = req.body;

      
      if (!tableId || !items || items.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'رقم الطاولة والعناصر مطلوبة'
        });
      }

      
      const table = tables.find(t => t.id === parseInt(tableId));
      if (!table) {
        return res.status(404).json({
          success: false,
          message: 'الطاولة غير موجودة'
        });
      }

      
      if (table.status === 'occupied' && table.currentOrderId) {
        return res.status(400).json({
          success: false,
          message: 'الطاولة محجوزة حالياً'
        });
      }

      // Process order items
      const orderItems = [];
      let totalAmount = 0;
      let nextItemId = orders.reduce((max, o) => 
        Math.max(max, ...o.items.map(i => i.id)), 0) + 1;

      for (const item of items) {
        const menuItem = menuItems.find(m => m.id === item.menuItemId);
        
        if (!menuItem) {
          return res.status(404).json({
            success: false,
            message: `العنصر ${item.menuItemId} غير موجود`
          });
        }

        if (!menuItem.isAvailable) {
          return res.status(400).json({
            success: false,
            message: `العنصر ${menuItem.name} غير متوفر حالياً`
          });
        }

        const subtotal = menuItem.price * item.quantity;
        totalAmount += subtotal;

        orderItems.push({
          id: nextItemId++,
          menuItemId: menuItem.id,
          menuItemName: menuItem.name,
          quantity: item.quantity,
          unitPrice: menuItem.price,
          subtotal,
          specialRequests: item.specialRequests || ''
        });
      }

      // Create order
      const newOrder = {
        id: getNextOrderId(),
        tableId: parseInt(tableId),
        customerId: req.user.role === 'customer' ? req.user.id : null,
        waiterId: req.user.role === 'waiter' ? req.user.id : (req.body.waiterId || null),
        status: 'pending',
        totalAmount: parseFloat(totalAmount.toFixed(2)),
        notes: notes || '',
        items: orderItems,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      orders.push(newOrder);

      // Update table status
      table.status = 'occupied';
      table.currentOrderId = newOrder.id;

      res.status(201).json({
        success: true,
        message: 'تم إنشاء الطلب بنجاح',
        data: newOrder
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ في إنشاء الطلب',
        error: error.message
      });
    }
  }

  // Update order status
  updateOrderStatus(req, res) {
    try {
      const orderId = parseInt(req.params.id);
      const { status } = req.body;

      const validStatuses = ['pending', 'preparing', 'ready', 'served', 'completed', 'cancelled'];
      
      if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'حالة غير صالحة'
        });
      }

      const order = orders.find(o => o.id === orderId);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'الطلب غير موجود'
        });
      }

      
      if (req.user.role === 'chef' && !['preparing', 'ready'].includes(status)) {
        return res.status(403).json({
          success: false,
          message: 'الشيف يمكنه فقط تحديث الحالة لـ "قيد التحضير" أو "جاهز"'
        });
      }

      if (req.user.role === 'waiter' && !['pending', 'served'].includes(status)) {
        return res.status(403).json({
          success: false,
          message: 'النادل يمكنه فقط تحديث الحالة لـ "معلق" أو "تم التقديم"'
        });
      }

      order.status = status;
      order.updatedAt = new Date();

      
      if (status === 'completed') {
        const orderIndex = orders.findIndex(o => o.id === orderId);
        orders.splice(orderIndex, 1);
        
        order.completedAt = new Date();
        orderHistory.push(order);

        
        const table = tables.find(t => t.id === order.tableId);
        if (table) {
          table.status = 'available';
          table.currentOrderId = null;
        }
      }

      res.json({
        success: true,
        message: 'تم تحديث حالة الطلب',
        data: order
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ في التحديث',
        error: error.message
      });
    }
  }

  // Cancel order
  cancelOrder(req, res) {
    try {
      const orderId = parseInt(req.params.id);
      const orderIndex = orders.findIndex(o => o.id === orderId);

      if (orderIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'الطلب غير موجود'
        });
      }

      const order = orders[orderIndex];

      
      if (['preparing', 'ready', 'served'].includes(order.status)) {
        return res.status(400).json({
          success: false,
          message: 'لا يمكن إلغاء الطلب في هذه المرحلة'
        });
      }

      
      orders.splice(orderIndex, 1);

      
      const table = tables.find(t => t.id === order.tableId);
      if (table) {
        table.status = 'available';
        table.currentOrderId = null;
      }

      res.json({
        success: true,
        message: 'تم إلغاء الطلب'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ في الإلغاء',
        error: error.message
      });
    }
  }

  // Add items to existing order
  addItemsToOrder(req, res) {
    try {
      const orderId = parseInt(req.params.id);
      const { items } = req.body;

      const order = orders.find(o => o.id === orderId);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'الطلب غير موجود'
        });
      }

      if (order.status === 'completed' || order.status === 'cancelled') {
        return res.status(400).json({
          success: false,
          message: 'لا يمكن إضافة عناصر لطلب منتهي'
        });
      }

      
      let nextItemId = Math.max(...order.items.map(i => i.id)) + 1;
      let additionalAmount = 0;

      for (const item of items) {
        const menuItem = menuItems.find(m => m.id === item.menuItemId);
        
        if (!menuItem || !menuItem.isAvailable) {
          continue;
        }

        const subtotal = menuItem.price * item.quantity;
        additionalAmount += subtotal;

        order.items.push({
          id: nextItemId++,
          menuItemId: menuItem.id,
          menuItemName: menuItem.name,
          quantity: item.quantity,
          unitPrice: menuItem.price,
          subtotal,
          specialRequests: item.specialRequests || ''
        });
      }

      order.totalAmount += additionalAmount;
      order.totalAmount = parseFloat(order.totalAmount.toFixed(2));
      order.updatedAt = new Date();

      res.json({
        success: true,
        message: 'تم إضافة العناصر للطلب',
        data: order
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ',
        error: error.message
      });
    }
  }

  // Remove item from order
  removeItemFromOrder(req, res) {
    try {
      const orderId = parseInt(req.params.id);
      const itemId = parseInt(req.params.itemId);

      const order = orders.find(o => o.id === orderId);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'الطلب غير موجود'
        });
      }

      const itemIndex = order.items.findIndex(i => i.id === itemId);

      if (itemIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'العنصر غير موجود في الطلب'
        });
      }

      const removedItem = order.items[itemIndex];
      order.totalAmount -= removedItem.subtotal;
      order.items.splice(itemIndex, 1);
      order.updatedAt = new Date();

      res.json({
        success: true,
        message: 'تم إزالة العنصر من الطلب',
        data: order
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

module.exports = new OrderController();