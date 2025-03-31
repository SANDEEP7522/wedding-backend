import express from 'express';

import {
  getUser,
  login,
  logout,
  registerUser,
  verifyOTP
} from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/verify-otp', verifyOTP);

router.post('/login', login);

router.get('/logout', isAuthenticated, logout);

router.get('/user', isAuthenticated, getUser);

export default router;
