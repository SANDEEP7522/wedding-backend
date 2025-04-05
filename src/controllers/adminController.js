import { StatusCodes } from 'http-status-codes';

import * as adminService from '../services/adminService.js';

export const getAllEventes = async (req, res) => {
  try {
    const events = await adminService.getAllVendorsForAdmin();
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'All Events In Admin Panel fetched successfully',
      data: events
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch vendors'
    });
  }
};

export const approveEvent = async (req, res) => {
  try {
    const updated = await adminService.approveEvent(req.params.id);
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Event approved successfully',
      data: updated
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to approve event'
    });
  }
};

export const adminRemoveEvent = async (req, res) => {
  try {
    console.log("Deleting event with ID:", req.params.id);
    await adminService.adminDeleteEvent(req.params.id);
    
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Event removed successfully'
    });
    
  } catch (err) {
    console.error("Error in adminRemoveEvent:", err.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to remove event',
      error: err.message
    });
  }
};

