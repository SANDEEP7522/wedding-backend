import express from 'express';

import { createEvent, getAllEvents } from '../controllers/eventController.js';

const router = express.Router();

router.post('/createEvent', createEvent);

router.get('/getAllEvents', getAllEvents);

export default router;
