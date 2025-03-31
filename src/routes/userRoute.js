import express from 'express';

import {
  login,
  logout,
  registerUser,
  verifyOTP
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/verify-otp', verifyOTP);

router.post('/login', login);

router.get('/logout', logout);

export default router;
