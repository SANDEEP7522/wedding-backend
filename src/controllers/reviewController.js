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

// Get all reviews for a specific vendor
export const getEventReviews = async (req, res) => {
  try {
    const eventId = req.params.id;
    const reviews = await reviewService.getVendorReviews(eventId);
    res.status(StatusCodes.OK).json({
      message: 'Reviews fetched successfully',
      success: true,
      data: reviews
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch reviews'
    });
  }
};

// Update a specific review by ID
export const updateReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const updatedReview = await reviewService.updateReview(reviewId, req.body);
    if (!updatedReview) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Review not found'
      });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Review updated successfully',
      data: updatedReview
    });
  } catch (err) {
    console.error('Error updating review', err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to update review'
    });
  }
};

// Delete a specific review by ID
export const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const deletedReview = await reviewService.deleteReview(reviewId);
    if (!deletedReview) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Review not found'
      });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting review', err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to delete review'
    });
  }
};
