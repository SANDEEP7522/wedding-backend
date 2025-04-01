import { StatusCodes } from 'http-status-codes';

import * as eventService from '../services/eventService.js';

export const createEvent = async (req, res) => {
  try {
    const { email, name } = req.body;

    const existingEvent = await eventService.getEventByNameAndEmail(
      name,
      email
    );
    if (existingEvent) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Event with the same Name and Email already exists'
      });
    }

    const newEvent = await eventService.createEvent(req.body);

    if (!newEvent) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Failed to create event'
      });
    }
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Event created successfully',
      data: newEvent
    });
  } catch (error) {
    console.log('Error creating event', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to create event'
    });
  }
};

// Get a list of all events (with optional filters)
export const getAllEvents = async (req, res) => {
  try {
    const { name, isActive } = req.query;
    const filters = {};
    if (name) filters.name = name;
    if (isActive !== undefined) filters.isActive = isActive;
    const events = await eventService.getAllEvents(filters);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'All events fetched successfully',
      data: events
    });
  } catch (error) {
    console.log('Error fetching events', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch events'
    });
  }
};

// // Get details of a specific event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await eventService.getEventById(req.params.id);
    if (!event) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Event not found'
      });
    }
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Event fetched successfully',
      data: event
    });
  } catch (error) {
    console.log('Error fetching event', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch event'
    });
  }
};

// // Update a specific event's profile
export const updateEventById = async (req, res) => {
  try {
    const updatedEvent = await eventService.updateEventById(
      req.params.id,
      req.body
    );
    if (!updatedEvent) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Event not found'
      });
    }
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Event updated successfully',
      data: updatedEvent
    });
  } catch (error) {
    console.error('Error updating event', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to update event'
    });
  }
};

// // Delete a specific event by ID
// exports.deleteEventById = async (req, res) => {
//   try {
//     const deletedEvent = await eventService.deleteEventById(req.params.id);
//     if (!deletedEvent) {
//       return response.error(res, 'Event not found', 404);
//     }
//     return response.success(res, deletedEvent, 'Event deleted successfully');
//   } catch (err) {
//     return response.error(res, err);
//   }
// };
