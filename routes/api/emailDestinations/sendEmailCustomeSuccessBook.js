// const express = require('express');

// const router = express.Router();

// const multiparty = require("multiparty");
// const nodemailer = require("nodemailer");
// var smtpTransport = require('nodemailer-smtp-transport');

// router.get('/customer', async function (req, res) {
//   res.json("Customer form")
// });

// var transport = nodemailer.createTransport(smtpTransport({
//   host: "mail.madbookings.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASS,
//   },
// }));

// // verify connection configuration
// transport.verify(function (error, success) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Server is ready to take our messages");
//   }
// });

// //Send customer a success email
// router.post("/formsuccessBook", (req, res) => {
//   let formBook = new multiparty.Form();
//   // console.log("formBook", formBook)
//   let data = {};
//   formBook.parse(req, function (err, fields) {
//     // console.log("fields", fields);
//     Object.keys(fields).forEach(function (property) {
//       data[property] = fields[property].toString();
//     });
//     // console.log("data", data);

//     const supplier = {
//       to: process.env.TOEMAIL, // receiver email,
//       subject: `${data.resort1} - Reservation request received`,
//       html: `<h1>Your accommodation request has been received</h1>
//       <p><b><i>Thank you for your request regarding accommodation in Namibia. Please note bookings
//         are not confirmed until a deposit has been paid.</i></b></p>
//       <h3>What will happen now?</h3>
//       <p>We will make a reservation for you based on availability and revert back to you shortly with
//         the payment procedure so you can confirm your reservation.</p>
//       <p>We will be happy to assist you with any queries you may have about your trip to Namibia.</p>
//       <p>Regards<br><br>The Madbookings Team<br>(NWR, Namibia Booking Agent)</p>`,
//     };
//     transport.sendMail(supplier, (err, data) => {
//       if (err) {
//         console.log(err);
//         res.status(500).send("Something went wrong.");
//       } else {
//         res.status(200).send("The email successfully sent to recipient!");
//       }
//     });
//   });
// });

// module.exports = router;