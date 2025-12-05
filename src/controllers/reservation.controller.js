const { reservations, tables, getNextReservationId } = require('../data/mockData');

class ReservationController {
  // Get all reservations
  getAllReservations(req, res) {
    try {
      const { status, date } = req.query;
      
      let filtered = [...reservations];
      
      if (status) {
        filtered = filtered.filter(r => r.status === status);
      }
      
      if (date) {
        const targetDate = new Date(date).toDateString();
        filtered = filtered.filter(r => new Date(r.date).toDateString() === targetDate);
      }

      res.json({
        success: true,
        count: filtered.length,
        data: filtered
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ',
        error: error.message
      });
    }
  }

  // Create a new reservation
  createReservation(req, res) {
    try {
      const { tableId, customerName, customerPhone, numberOfGuests, date, time, notes } = req.body;

      if (!tableId || !customerName || !customerPhone || !numberOfGuests || !date || !time) {
        return res.status(400).json({
          success: false,
          message: 'جميع الحقول مطلوبة'
        });
      }

      const table = tables.find(t => t.id === parseInt(tableId));
      if (!table) {
        return res.status(404).json({
          success: false,
          message: 'الطاولة غير موجودة'
        });
      }

      const newReservation = {
        id: getNextReservationId(),
        tableId: parseInt(tableId),
        customerName,
        customerPhone,
        numberOfGuests: parseInt(numberOfGuests),
        date: new Date(date),
        time,
        status: 'pending',
        notes: notes || '',
        createdAt: new Date()
      };

      reservations.push(newReservation);

      res.status(201).json({
        success: true,
        message: 'تم إنشاء الحجز بنجاح',
        data: newReservation
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ',
        error: error.message
      });
    }
  }

  // Update reservation
  updateReservation(req, res) {
    try {
      const reservationId = parseInt(req.params.id);
      const reservation = reservations.find(r => r.id === reservationId);

      if (!reservation) {
        return res.status(404).json({
          success: false,
          message: 'الحجز غير موجود'
        });
      }

      Object.assign(reservation, req.body);

      res.json({
        success: true,
        message: 'تم تحديث الحجز',
        data: reservation
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ',
        error: error.message
      });
    }
  }

  // Delete reservation
  deleteReservation(req, res) {
    try {
      const reservationId = parseInt(req.params.id);
      const index = reservations.findIndex(r => r.id === reservationId);

      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: 'الحجز غير موجود'
        });
      }

      reservations.splice(index, 1);

      res.json({
        success: true,
        message: 'تم حذف الحجز'
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

module.exports = new ReservationController();