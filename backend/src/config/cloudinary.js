// TODO Day 16: Cloudinary config
// npm install cloudinary multer multer-storage-cloudinary

const cloudinary = require('cloudinary').v2; // cloudinary v1 package exports .v2 (same API)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
