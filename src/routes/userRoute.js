import express from 'express';

import {
  login,
  registerUser,
  verifyOTP
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/verify-otp', verifyOTP);

router.post('/login', login);

export default router;
