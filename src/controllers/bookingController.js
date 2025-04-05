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

// Get a specific booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await bookingService.getBookingById(req.params.id);
    if (!booking) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Booking not found'
      });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Your Booking fetched successfully',
      data: booking
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch booking'
    });
  }
};

// Update a specific booking by ID by the Admin update from Admin panel
export const updateBooking = async (req, res) => {
  try {
    const updatedBooking = await bookingService.updateBooking(
      req.params.id,
      req.body
    );
    if (!updatedBooking) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Booking not found'
      });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Booking updated successfully',
      data: updatedBooking
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to update booking'
    });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await bookingService.deleteBooking(req.params.id);
    if (!deletedBooking) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Booking not found'
      });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to delete booking'
    });
  }
};
