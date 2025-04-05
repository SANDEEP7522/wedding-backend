import express from 'express';

import {
  createBooking,
  getAllBookings
} from '../controllers/bookingController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/booking', isAuthenticated, createBooking);

router.get('/all-bookings', isAuthenticated, getAllBookings);

export default router;
