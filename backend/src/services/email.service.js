// TODO Day 4 — AI generates this (Nodemailer wrapper)
// Used for: workspace invites, password reset emails, email verification
//
// Interview Q: Why not send emails synchronously in the API request?
// Answer: Sending email is slow (external service call). If you await it inside
// the route handler, the API response blocks until the email sends.
// At scale: push to a job queue (BullMQ + Redis). Background worker sends it.
// API responds instantly. Job retries automatically if email service is down.
// For this app: direct send is fine (low volume). Worth mentioning the queue pattern.

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  });
};

module.exports = { sendEmail };
