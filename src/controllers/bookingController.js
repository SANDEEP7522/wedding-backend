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

// Get all bookings for the authenticated user
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getAllBookings(req.user.id); // req.user from auth middleware
    //     console.log('bookings', bookings);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'All Bookings fetched successfully',
      data: bookings
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch bookings'
    });
  }
};
