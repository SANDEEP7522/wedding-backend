import express from 'express';

import { approveEvent, getAllEventes } from '../controllers/adminController.js';

const router = express.Router();

router.get('/events', getAllEventes);

router.put('/events/:id/approve', approveEvent);

export default router;
