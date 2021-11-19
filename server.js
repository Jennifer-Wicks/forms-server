require("dotenv").config();
const express = require("express");
const apiRoute = require('./routes/api/Index');
const cors = require("cors");

const PORT = process.env.PORT || 5000;

// instantiate an express app
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// cors
app.use(cors());
// API Routes
app.use('/api', apiRoute);

/*************************************************/
// Express server listening...
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
