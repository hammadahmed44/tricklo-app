const bcrypt = require('bcryptjs');
const User = require('../models/User');

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
const register = async ({ name, email, password }) => { 
    let emailExists = await User.findOne({ email });
    if (emailExists) {
      throw new Error('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashedPassword });
    user.password = undefined; // never send password in response, even hashed
    // TODO Day 3: send verification email here
    return user;
}


//   login({ email, password })
//     - find user by email
//     - compare password: bcrypt.compare(plain, hashed)
//     - generate access token (15min) + refresh token (7d)
//     - store HASHED refresh token in DB
//     - return { accessToken, user }
//     - controller puts refresh token in httpOnly cookie
//
 const login=async({email,password})=>{
const user= await User.findOne({email}).select('+password')
if(!user){
  throw new Error('Invalid credentials');
 }
const passwordMatch = await user.comparePassword(password);
if(!passwordMatch){
  throw new Error('Invalid credentials');
 }
const accessToken=user.generateAccessToken();
const refreshToken=user.generateRefreshToken();
user.refreshToken=await bcrypt.hash(refreshToken,12);

await user.save();
user.password = undefined;
  user.refreshToken = undefined;
return {accessToken,refreshToken,user:user}
}
//   refreshToken(token from cookie)
//     - hash incoming token, find matching user in DB
//     - verify with JWT_REFRESH_SECRET
//     - generate new access tzoken
//     - rotate refresh token (new token, invalidate old one)
//     - return new accessToken
//

const jwt = require('jsonwebtoken');

const refreshToken=async(token)=>{
  if(!token) throw new Error('No refresh token');

  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  const user = await User.findById(decoded.id).select('+refreshToken');
  if(!user || !user.refreshToken){
    throw new Error('Invalid refresh token');
}
  const isMatch = await bcrypt.compare(token, user.refreshToken);
  if(!isMatch){
    throw new Error('Invalid refauthresh token');
  }
  const accessToken=user.generateAccessToken();
  const refreshToken=user.generateRefreshToken();
  user.refreshToken=await bcrypt.hash(refreshToken,12);
  await user.save();
  return {accessToken, refreshToken}
}
//   logout(userId)
//     - clear refreshToken field in DB
const logout=async(userId)=>{
  const user=await User.findById(userId)
user.refreshToken=null
await user.save()
}
// Interview Q: Why rotate the refresh token on every use?
// Answer: If a token is stolen, using it once invalidates it for the attacker.
// The legitimate user's next request fails (their token was rotated too) — they re-login.
// This limits the window an attacker can abuse a stolen token.

module.exports = { register, login, logout, refreshToken };
