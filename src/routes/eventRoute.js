import express from 'express';

import {
  createEvent,
  deleteEventById,
  getAllEvents,
  getEventById,
  updateEventById
} from '../controllers/eventController.js';

const router = express.Router();

router.post('/createEvent', createEvent);

router.get('/getAllEvents', getAllEvents);

router.get('/:id', getEventById);

router.put('/update/:id', updateEventById);

router.put('/delete/:id', deleteEventById);

export default router;
