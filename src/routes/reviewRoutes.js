import express from 'express';

import {
  addReview,
  deleteReview,
  getEventReviews,
  updateReview
} from '../controllers/reviewController.js';

const router = express.Router();

router.post('/:id/review', addReview);

router.post('/:id/reviews', getEventReviews);

router.put('/:reviewId', updateReview);

router.delete('/delete/:reviewId', deleteReview);

export default router;
