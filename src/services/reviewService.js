import Review from '../models/reviewModel.js';

// Add a review for a vendor
export const addReview = async (eventId, reviewData) => {
  const review = new Review({ ...reviewData, eventId });
  return await review.save();
};

// Get all reviews for a specific vendor
export const getVendorReviews = async (eventId) => {
  return await Review.find({ eventId });
};

export const updateReview = async (reviewId, reviewData) => {
  return await Review.findByIdAndUpdate(reviewId, reviewData, { new: true });
};

// Delete a specific review by ID
export const deleteReview = async (reviewId) => {
  return await Review.findByIdAndDelete(reviewId);
};
