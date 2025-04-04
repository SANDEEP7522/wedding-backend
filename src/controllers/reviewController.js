import { StatusCodes } from 'http-status-codes';

import * as reviewService from '../services/reviewService.js';
export const addReview = async (req, res) => {
  try {
    const eventId = req.params.id;
    const reviewData = req.body;
    const newReview = await reviewService.addReview(eventId, reviewData);
    res.status(StatusCodes.CREATED).json({
      message: 'Review added successfully',
      success: true,
      data: newReview
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to add review'
    });
  }
};
