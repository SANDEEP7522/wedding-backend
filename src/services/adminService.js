import Event from '../models/eventModel.js';

export const getAllVendorsForAdmin = async () => {
  return await Event.find(); // Optionally, filter by isApproved: false
};

export const approveEvent = async (eventId) => {
  return await Event.findByIdAndUpdate(
    eventId,
    { isApproved: true },
    { new: true }
  );
};
