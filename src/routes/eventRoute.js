import express from 'express';

import {
  createEvent,
  getAllEvents,
  getEventById
} from '../controllers/eventController.js';

const router = express.Router();

router.post('/createEvent', createEvent);

router.get('/getAllEvents', getAllEvents);

router.get('/:id', getEventById);

export default router;
