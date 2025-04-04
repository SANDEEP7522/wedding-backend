import Review from '../models/reviewModel.js';

// Add a review for a vendor
export const addReview = async (eventId, reviewData) => {
  const review = new Review({ ...reviewData, eventId });
  return await review.save();
};
