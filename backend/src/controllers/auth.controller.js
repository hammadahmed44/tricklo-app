// TODO Day 2 — YOU write this (most important file for interviews)
// Rule: controllers are THIN — call service, return response. No business logic here.
//
// Functions to implement:
//   register(req, res)  — POST /api/auth/register
//   login(req, res)     — POST /api/auth/login
//   logout(req, res)    — POST /api/auth/logout
//   refresh(req, res)   — POST /api/auth/refresh
//   forgotPassword(req, res) — POST /api/auth/forgot-password
//   resetPassword(req, res)  — POST /api/auth/reset-password
//
// Pattern for every controller function:
//   const result = await authService.someMethod(req.body);
//   return success(res, result, 'message');

const authService = require('../services/auth.service');
const { success, created } = require('../utils/response');

module.exports = {
  // implement each function here
};
