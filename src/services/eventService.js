import Event from '../models/eventModel.js';

// Create a new event
export const createEvent = async (eventData) => {
  const event = new Event(eventData);
  return await event.save();
};

export const getEventByNameAndEmail = async (name, email) => {
  return await Event.findOne({ name, email });
};

// // Get all events with optional filters
export const getAllEvents = async (filters = {}) => {
  return await Event.find(filters).sort({ createdAt: -1 });
};

// // Get a specific event by ID
// export const getEventById = async (id) => {
//   return await Event.findById(id);
// };

// // Update event by ID
// export const updateEventById = async (id, eventData) => {
//   return await Event.findByIdAndUpdate(id, eventData, { new: true });
// };

// // Delete an event by ID
// export const deleteEventById = async (id) => {
//   return await Event.findByIdAndDelete(id);
// };
