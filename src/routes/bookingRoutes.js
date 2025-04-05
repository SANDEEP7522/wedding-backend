import express from 'express';

import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking
} from '../controllers/bookingController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/booking', isAuthenticated, createBooking);

router.get('/all-bookings', isAuthenticated, getAllBookings);

router.get('/booking/:id', isAuthenticated, getBookingById);

router.put('/booking/update/:id', isAuthenticated, updateBooking);

export default router;
