// TODO Day 3 — wire this to auth routes
// Purpose: prevent brute-force attacks on /auth/* endpoints
//
// Interview Q: What is rate limiting and why on auth routes specifically?
// Answer: Without it, attacker can try millions of passwords per second.
// express-rate-limit counts requests per IP in a sliding window.
// Auth routes need stricter limits than general API (100 req/min vs 10 req/15min)

const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 login attempts per 15 minutes per IP
  message: { success: false, message: 'Too many attempts, please try again in 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  message: { success: false, message: 'Too many requests, please slow down' },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { authLimiter, generalLimiter };
