import express from 'express';
import passport from 'passport';
import {
  register,
  login,
  getCurrentUser,
  logout,
  googleCallback,
  refreshToken,
  updateProfile,
} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { session: false }), googleCallback);

// Protected routes
router.get('/me', authenticate, getCurrentUser);
router.post('/logout', authenticate, logout);
router.post('/refresh', authenticate, refreshToken);
router.put('/profile', authenticate, updateProfile);

export default router;
