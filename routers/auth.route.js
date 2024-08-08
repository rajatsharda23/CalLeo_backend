const express = require('express');
const { google } = require('googleapis');
require('dotenv').config();
const router = express.Router();
const cors = require("cors");


router.use(cors())

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;


// const oauth2Client = new google.auth.OAuth2(
//   GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET,
//   REDIRECT_URI,
//   'authorization_code',
// );



const googleAuth = new GoogleAuth({
  credentials: {
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
  },
  scopes: ['https://www.googleapis.com/auth/calendar'],
});


router.post('/create-tokens', async (req, res) => {
  try {
    const { code } = req.body;
    const oauth2Client = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      REDIRECT_URI
    );
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    res.json(tokens);
  } catch (err) {
    console.error('Error exchanging authorization code for tokens:', err);
    res.status(400).send({
      error: 'Failed to exchange authorization code for tokens',
      details: err.response ? err.response.data : err.message,
    });
  }
});

router.post('/create-tokens/refresh-token', async (req, res) => {
  const user = new UserRefreshClient(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    req.body.refreshToken,
  );
  const { credentials } = await user.refreshAccessToken(); // optain new tokens
  res.json(credentials);
})


module.exports = router;
