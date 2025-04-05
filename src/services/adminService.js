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

export const adminDeleteEvent = async (eventId) => {
  console.log('Received event ID:', eventId);
  const deletedEvent = await Event.findByIdAndDelete(eventId);
  console.log('Deleted Event:', deletedEvent);
  if (!deletedEvent) {
    throw new Error('Event not found');
  }
  return deletedEvent;
};
