const express = require("express");
const cors = require("cors");
const authRouter = require('./routers/auth.route');
const sessionMiddleware = require('./middleware/sessionMiddleware');
const config = require('./config/config'); // Import the config file
require('dotenv').config();

const port = process.env.PORT || 6666;
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // to parse URL-encoded bodies
app.use(sessionMiddleware);



app.use(config.apiVersion + '/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
