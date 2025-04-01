import express from 'express';

import { createEvent } from '../controllers/eventController.js';

const router = express.Router();

router.post('/createEvent', createEvent);

export default router;
