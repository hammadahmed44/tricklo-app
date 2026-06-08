// TODO Day 2 — YOU write the schema (study: bcrypt, JWT, Mongoose methods)
// After writing, ask AI to review it

const mongoose = require('mongoose');

// Fields to implement:
// name, email (unique), password (bcrypt hashed), avatar (Cloudinary URL),
// refreshToken (hashed in DB), isVerified (Boolean), resetPasswordToken, resetPasswordExpires, createdAt

// Methods to add on schema:
//   schema.methods.comparePassword = async function(plainText) { ... bcrypt.compare }
//   schema.methods.generateAccessToken = function() { ... jwt.sign }
//   schema.methods.generateRefreshToken = function() { ... jwt.sign }

// Interview Q: Why store refreshToken HASHED in DB?
// Answer: If DB is compromised, attacker cannot use the raw refresh tokens
// to generate new access tokens. Same reason we hash passwords.

const userSchema = new mongoose.Schema({
  // implement me
});

module.exports = mongoose.model('User', userSchema);
