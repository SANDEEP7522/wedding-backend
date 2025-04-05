import express from 'express';

import {
  getCategories,
  searchEvent
} from '../controllers/SearchFilteringController.js';

const router = express.Router();

router.get('/search', searchEvent);

router.get('/categories', getCategories);

export default router;
