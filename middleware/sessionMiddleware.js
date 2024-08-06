const session = require('express-session');

const session_secret = process.env.SESSION_SECRET

const oneDay = 1000 * 60 * 60 * 24;

const sessionMiddleware = session({
  secret: session_secret,
  resave: false,
  cookie: { maxAge: oneDay },
  saveUninitialized: true,
});

module.exports = sessionMiddleware;
