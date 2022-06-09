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
// router.post("/formsuccessQuote", (req, res) => {
//   let formSucc = new multiparty.Form();
//   // console.log("formSucc", formSucc)
//   let data = {};
//   formSucc.parse(req, function (err, fields) {
//     // console.log("fields", fields);
//     Object.keys(fields).forEach(function (property) {
//       data[property] = fields[property].toString();
//     });
//     // console.log("data", data);

//     const supplier = {
//       to: process.env.TOEMAIL, // receiver email,
//       subject: `${data.resort1} - Reservation request received`,
//       html: `<h1>Your request for an accommodation quote has been received</h1>
//       <p><b><i>Thank you for your request regarding the cost of accommodation in Namibia.</i></b></p>
//       <h3>What will happen now?</h3>
//       <p>We will reply to you shortly with a quote based on your request, should you wish to add to
//         or amend the details of your request please reply to this email.</p>
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