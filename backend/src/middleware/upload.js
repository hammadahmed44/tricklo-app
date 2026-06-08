// TODO Day 16 — AI generates this boilerplate (file uploads = senior signal)
// Purpose: multer middleware that streams files directly to Cloudinary
//
// Interview Q: What happens if upload fails midway?
// Answer: If Cloudinary gets the file but DB write fails, catch the error,
// call cloudinary.uploader.destroy(public_id) to clean up, return 500.
// Always clean up external resources on failure.

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'taskify',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'],
    resource_type: 'auto',
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

module.exports = upload;
