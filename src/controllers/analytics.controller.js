const { analytics, orderHistory, orders } = require('../data/mockData');

class AnalyticsController {
  // Get sales data
  getSalesData(req, res) {
    try {
      res.json({
        success: true,
        data: analytics.dailySales
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ',
        error: error.message
      });
    }
  }

  // Get popular items
  getPopularItems(req, res) {
    try {
      res.json({
        success: true,
        data: analytics.popularItems
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ',
        error: error.message
      });
    }
  }

  // Get peak hours
  getPeakHours(req, res) {
    try {
      res.json({
        success: true,
        data: analytics.peakHours
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ',
        error: error.message
      });
    }
  }

  // Get dashboard summary
  getDashboard(req, res) {
    try {
      const activeOrders = orders.length;
      const completedToday = orderHistory.filter(o => {
        const today = new Date().toDateString();
        return new Date(o.completedAt).toDateString() === today;
      }).length;

      const totalRevenue = analytics.dailySales.today;

      res.json({
        success: true,
        data: {
          activeOrders,
          completedToday,
          totalRevenue,
          sales: analytics.dailySales,
          popularItems: analytics.popularItems.slice(0, 5),
          peakHours: analytics.peakHours
        }
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

module.exports = new AnalyticsController();