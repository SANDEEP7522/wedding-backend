import express from 'express';

import {
  addReview,
  getEventReviews,
  updateReview
} from '../controllers/reviewController.js';

const router = express.Router();

router.post('/:id/review', addReview);

router.post('/:id/reviews', getEventReviews);

router.put('/:id/review/:reviewId', updateReview);

export default router;
