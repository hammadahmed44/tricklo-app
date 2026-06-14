// TODO Day 2 — YOU wire the routes (controllers + middleware)
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authController = require('../controllers/auth.controller');
const { authLimiter } = require('../middleware/rateLimiter');
const validate = require('../middleware/validate');
const { registerSchema, loginSchema } = require('../validations/auth.schema');

// POST /api/auth/register
router.post('/register', authLimiter, validate(registerSchema), authController.register);

// POST /api/auth/login
router.post('/login', authLimiter, validate(loginSchema), authController.login);

// POST /api/auth/logout
router.post('/logout',auth, authController.logout);

// POST /api/auth/refresh
router.post('/refresh', authController.refresh);

// POST /api/auth/forgot-password
// router.post('/forgot-password', authLimiter, authController.forgotPassword);

// POST /api/auth/reset-password
// router.post('/reset-password', authController.resetPassword);

module.exports = router;
