const express = require('express');
const { google } = require('googleapis');
require('dotenv').config();
const router = express.Router();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URI
);

// Test route to ensure the auth route is working
router.get('/test', (req, res) => {
  res.send({ message: "Auth API working" });
});

// Route to initiate Google OAuth
router.get('/google', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
  });
  res.redirect(authUrl);
});

// Route to handle OAuth2 callback and create tokens
router.get('/google/callback', async (req, res, next) => {
  try {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    res.json(tokens); // You can store these tokens in the session or database
  } catch (error) {
    next(error);
  }
});

module.exports = router;
