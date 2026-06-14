// TODO Day 2 — YOU write the schema (study: bcrypt, JWT, Mongoose methods)
// After writing, ask AI to review it
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
 name:{type:String,required:true,trim:true},
  email:{type:String,required:true,unique:true,lowercase:true,trim:true},
  password:{type:String,required:true,minlength: 6, select: false },
  avatar:{type:String,default:''},
    refreshToken:{type:String,default:null},
  isVerified:{type:Boolean,default:false},
  resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    
},  { timestamps: true }
);
userSchema.methods.comparePassword=async function (plainText) {
  return bcrypt.compare(plainText,this.password)
}
userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES || '15m',
  });
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES || '7d',
  });
};
module.exports = mongoose.model('User', userSchema);
