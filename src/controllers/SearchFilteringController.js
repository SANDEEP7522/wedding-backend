import { StatusCodes } from 'http-status-codes';

import * as vendorService from '../services/SearchFilteringService.js';

export const searchEvent = async (req, res) => {
  try {
    const events = await vendorService.getSearchEvent(req.query);
    // console.log('events000000000', events); // working

    res.status(StatusCodes.OK).json({
      message: 'Event fetched successfully',
      success: true,
      data: events
    });
  } catch (error) {
    console.error('Error fetching vendors', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to search filtering'
    });
  }
};

// Get a list of unique vendor categories
export const getCategories = async (req, res) => {
  try {
    const categories = await vendorService.getVendorCategories();
    res.status(StatusCodes.OK).json({
      message: 'Event categories fetched successfully',
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching Event categories', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch event categories'
    });
  }
};
