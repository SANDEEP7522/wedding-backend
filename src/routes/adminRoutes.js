import express from 'express';

import {
  adminRemoveEvent,
  approveEvent,
  getAllEventes
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/events', getAllEventes);

router.put('/events/:id/approve', approveEvent);

router.delete('/events/:id', adminRemoveEvent);

export default router;
