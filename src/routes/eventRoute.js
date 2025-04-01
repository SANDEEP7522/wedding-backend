import express from 'express';

import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEventById
} from '../controllers/eventController.js';

const router = express.Router();

router.post('/createEvent', createEvent);

router.get('/getAllEvents', getAllEvents);

router.get('/:id', getEventById);

router.put('/:id', updateEventById);

export default router;
