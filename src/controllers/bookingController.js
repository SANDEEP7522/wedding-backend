import { StatusCodes } from 'http-status-codes';

import * as bookingService from '../services/bookingService.js';
// Create a booking
export const createBooking = async (req, res) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to create booking'
    });
  }
};
