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
const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service');
const { success, created } = require('../utils/response');


module.exports = {
  register: async (req, res) => {
  const user = await authService.register(req.body);
  return created(res, user, 'User registered successfully');  
  },
  login:async(req,res)=>{
    const {accessToken,refreshToken,user}=await authService.login(req.body);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return success(res, { accessToken, user }, 'Login successful');
  },
  logout: async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return success(res, null, 'Logged out');
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    await authService.logout(decoded.id);
    res.clearCookie('refreshToken');
    return success(res, null, 'Logout successful');
  },
  refresh: async (req, res) => {
    const token = req.cookies.refreshToken;
    const { accessToken, refreshToken } = await authService.refreshToken(token);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return success(res, { accessToken }, 'Token refreshed');
  },
}
