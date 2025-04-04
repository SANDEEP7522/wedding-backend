import express from 'express';

import { addReview, getEventReviews } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/:id/review', addReview);

router.post('/:id/reviews', getEventReviews);

export default router;
