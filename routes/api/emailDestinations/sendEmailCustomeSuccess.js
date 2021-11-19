const express = require('express');

const router = express.Router();

const multiparty = require("multiparty");
const nodemailer = require("nodemailer");

router.get('/customer', async function (req, res) {
  res.json("Customer form")
});

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    type: "login", //Default
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

//Send customer a success email
router.post("/formsuccess", (req, res) => {
  let formSucc = new multiparty.Form();
  // console.log("formSucc", formSucc)
  let data = {};
  formSucc.parse(req, function (err, fields) {
    console.log("fields", fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });
    // console.log("data", data);

    const supplier = {
      to: process.env.TOEMAIL, // receiver email,
      subject: `formsuccess ${data.arriveday1} ${data.resort1} - Reservation request received`,
      html: `<h1>Your Request has been Submitted</h1>
      <p><b><i>Thankyou for your request. Please note bookings are not confirmed until a deposit has been paid.</i></b></p>
      <h3>What will happen now?</h3>
      <p>Your request has been assigned to one of our dedicated team members who will make a reservation for you 
        based on availability and revert back to you shortly with the payment procedure so you can confirm your 
        reservation.
      </p>
      <p>Your Travel Consultant will be happy to assist you with any queries you may have about your trip to Namibia.</p>
      <p>Regards<br><br>The Madbookings Team<br>(NWR, Namibia Booking Agent)</p>`,
    };
    transporter.sendMail(supplier, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200).send("The email successfully sent to recipient!");
      }
    });
  });
});

module.exports = router;