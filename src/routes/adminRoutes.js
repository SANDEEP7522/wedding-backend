import express from 'express';

import { getAllEventes } from '../controllers/adminController.js';

const router = express.Router();

router.get('/events', getAllEventes);

export default router;
