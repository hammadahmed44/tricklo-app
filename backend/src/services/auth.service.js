// TODO Day 2 — YOU write this (most interview-dense file in the entire project)
// All business logic for auth lives here. Controller just calls these methods.
//
// Functions to implement:
//
//   register({ name, email, password })
//     - check if email exists → throw error if yes
//     - hash password: bcrypt.hash(password, 12)
//     - create user in DB
//     - send verification email (Day 3)
//     - return user (without password)
//
//   login({ email, password })
//     - find user by email
//     - compare password: bcrypt.compare(plain, hashed)
//     - generate access token (15min) + refresh token (7d)
//     - store HASHED refresh token in DB
//     - return { accessToken, user }
//     - controller puts refresh token in httpOnly cookie
//
//   refreshToken(token from cookie)
//     - hash incoming token, find matching user in DB
//     - verify with JWT_REFRESH_SECRET
//     - generate new access token
//     - rotate refresh token (new token, invalidate old one)
//     - return new accessToken
//
//   logout(userId)
//     - clear refreshToken field in DB
//
// Interview Q: Why rotate the refresh token on every use?
// Answer: If a token is stolen, using it once invalidates it for the attacker.
// The legitimate user's next request fails (their token was rotated too) — they re-login.
// This limits the window an attacker can abuse a stolen token.

module.exports = {};
