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
