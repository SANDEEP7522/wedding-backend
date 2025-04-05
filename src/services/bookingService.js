import Booking from '../models/bookingModel.js';

export const createBooking = async (bookingData) => {
  return await Booking.create(bookingData);
};
