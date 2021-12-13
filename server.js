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
app.use("/public", express.static(process.cwd() + "/public")); //make public static

//Index page (static HTML)
app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/public/index.html");
});

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRETS;

app.post("/recaptcha", function (request, response) {
  var recaptcha_url = "https://www.google.com/recaptcha/api/siteverify?";
  recaptcha_url += "secret=" + RECAPTCHA_SECRET + "&";
  recaptcha_url += "response=" + request.body["g-recaptcha-response"] + "&";
  recaptcha_url += "remoteip=" + request.socket.remoteAddress;
  Request(recaptcha_url, function (error, resp, body) {
    body = JSON.parse(body);
    if (body.success !== undefined && !body.success) {
      return response.send({ "message": "Captcha validation failed" });
    }
    response.status(200).json(body)
    // res.status(200).json("updated").send(body)
    // response.redirect('http://www.nwrnamibia.com')
  });
});

// Express server listening...
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
