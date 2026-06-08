// TODO Day 2 — YOU write this (interview topic: JWT internals)
const jwt = require('jsonwebtoken');

// Interview Q: What is inside a JWT?
// Answer: Three base64url-encoded parts separated by dots:
//   Header: { alg: "HS256", typ: "JWT" }
//   Payload: { id, iat, exp } — never put sensitive data here, it's NOT encrypted
//   Signature: HMAC-SHA256(header + "." + payload, secret)
// Verification: server re-computes signature, compares. If mismatch → tampered.
// Expiry: exp field is checked by jwt.verify() automatically.

const generateAccessToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES || '15m' }
  );
};

const generateRefreshToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES || '7d' }
  );
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};

module.exports = { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken };
