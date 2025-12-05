const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

router.get('/', reservationController.getAllReservations);
router.post('/', reservationController.createReservation);
router.put('/:id', authenticate, authorize('manager', 'waiter'), reservationController.updateReservation);
router.delete('/:id', authenticate, authorize('manager'), reservationController.deleteReservation);

module.exports = router;