import Booking from '../models/bookingModel.js';
export const createBooking = async (bookingData) => {
  const existing = await Booking.findOne({
    userId: bookingData.userId,
    eventId: bookingData.eventId
  });

  if (existing) {
    return existing; // Booking already exists for the user and event shows
  }

  return await Booking.create(bookingData);
};

export const getAllBookings = async (userId) => {
  try {
    const bookings = await Booking.find({ userId }).populate('eventId');
    //     console.log('Bookings found:', bookings);
    return bookings;
  } catch (error) {
    console.error('Error while fetching bookings:', error);
    throw error;
  }
};

export const getBookingById = async (id) => {
  return await Booking.findById(id).populate('eventId');
};
