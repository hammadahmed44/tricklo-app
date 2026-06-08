// TODO Day 3 — YOU write this (interview topic: JWT internals)
// Purpose: verify JWT access token on every protected route, attach req.user
//
// Steps to implement:
//   1. Read Authorization header: req.headers.authorization
//   2. Extract token: header.split(' ')[1]  (format: "Bearer <token>")
//   3. Verify: jwt.verify(token, process.env.JWT_ACCESS_SECRET)
//   4. Find user in DB by decoded.id
//   5. Attach to req.user = user
//   6. Call next() — or throw 401 if anything fails
//
// Interview Q: Why do you store the token in Authorization header, not a cookie?
// Answer: Access tokens in memory/header = XSS risk only. Refresh tokens in httpOnly
// cookie = CSRF risk only (mitigated by SameSite=Strict). Defense in depth.

module.exports = async (req, res, next) => {
  next(); // remove this line when you implement
};
