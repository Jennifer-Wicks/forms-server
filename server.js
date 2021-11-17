const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// instantiate an express app
const app = express();

app.use(express.urlencoded({
  extended: true
}));
// cors
app.use(cors());

app.use("/public", express.static(process.cwd() + "/public")); //make public static

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

app.post("/customer", (req, res) => {
  let form = new multiparty.Form();
  // console.log("form", form)
  let data = {};
  form.parse(req, function (err, fields) {
    console.log("fields", fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });
    // console.log("data", data);
    const mail = {
      from: `${data.email}`,
      to: process.env.TOEMAIL, // receiver email,
      subject: `client ${data.arriveday1} ${data.resort1} \(${data.name} ${data.surname}\)`,
      html: `<p><strong>Name:</strong> ${data.name}</p> 
        <p><strong>Surname:</strong> ${data.surname}</p>
        <p><strong>Nationality:</strong> ${data.nationality}</p>
        <p><strong>Telephone number:</strong> ${data.tel}</p>
        <p><strong>Email:</strong> ${data.email}</p>         
        <p><strong>Email check:</strong> ${data.emailcheck}</p>
        <p><strong>Adults:</strong> ${data.adults}</p>
        <p><strong>Child 1-5:</strong> ${data.childnopay}</p>
        <p><strong>Child 6-12:</strong> ${data.childhalfprice}</p>
        <p><strong>Resort 1:</strong> ${data.resort1}</p>
        <p><strong>Accomtype 1:</strong> ${data.accomtype1}</p>
        <p><strong>Arriveday 1:</strong> ${data.arriveday1}</p>
        <p><strong>Departday 1:</strong> ${data.departday1}</p>
        <p><strong>Comments:</strong> ${data.comments}</p>
        <p><strong>News letter:</strong> ${data.newsletter}</p>`,
    };
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200).send("Email successfully sent to recipient!");
      }
    });
  });
});

app.post("/supplier", (req, res) => {
  let formS = new multiparty.Form();
  // console.log("formS", formS)
  let data = {};
  formS.parse(req, function (err, fields) {
    console.log("fields", fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });
    // console.log("data", data);
    const supplier = {
      to: process.env.TOEMAIL, // receiver email,
      subject: `Form Success ${data.arriveday1} ${data.resort1} \(${data.name} ${data.surname}\)`,
      html: `
        <h3>Dear Oryx</h3>
        <p>Please make the following Reservation for me: <strong style="color: red">- 1 Booking</strong></p>
        <p>&nbsp;</p>
        <p><strong>Reservation Name:</strong> ${data.name} ${data.surname}</p> 
        <p>&nbsp;</p>        
        <p><strong>Lodge Name:</strong> ${data.resort1}</P>
        <p><strong>Arrive:</strong> ${data.arriveday1}</p>
        <p><strong>Depart:</strong> ${data.departday1}</p>
        <p><strong>Children (under 6 yrs):</strong> ${data.childnopay} - No Charge</p>
        <p><strong>Children (age 6 -12 yrs):</strong> ${data.childhalfprice} - Paying 50%</p>
        <p><strong>Type of Accommodation: </strong> ${data.accomtype1}</p>
        <p>&nbsp;</p>
        <p>I look forward to your confirmation.</p>
        <p>Rep 3</p>
        <p>Madbookings</p>`,
    };
    transporter.sendMail(supplier, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200).send("Email successfully sent to recipient!");
      }
    });
  });
});

app.post("/formsuccess", (req, res) => {
  let formS = new multiparty.Form();
  // console.log("formS", formS)
  let data = {};
  formS.parse(req, function (err, fields) {
    console.log("fields", fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });
    // console.log("data", data);
    const supplier = {
      to: process.env.TOEMAIL, // receiver email,
      subject: `Supplier ${data.arriveday1} ${data.resort1} - Reservation request received`,
      html: `
      <h1>Namibia Wildlife Resorts <i style="font-size: 15px; text-align: center;">by Madbookings</i></h1>
      <h2>Accommodation in Namibia's National Parks - site run by an NWR booking agent Madbookings</h2>
      <h1>Your Request has been Submitted</h1>
      <p><b><i>Thankyou for your request. Please note a deposit payment is required immediately to confirm all
      reservations.</i></b></p>
      <h3>What will happen now?</h3>
      <p>You will receive an automatic email, should you wish to add to your reservation please respond to this email
      with your full itinerary and requests rather than send a new booking enquiry. This will help us provide a
      better service to you our valued guest.</p>
      <p>Your request will be assigned one of our dedicated team members who will make a reservation for you based on
      availability and revert back to you shortly to confirm the cost, and payment procedure so you can confirm
      your reservation.Once your payment has been received our admin team will continue to make sure you are
      reminded when further payments are due, and send you your e-voucher which must be presented at
      receptionensuring a smooth check-in process.</p>
      <p>Your Travel Consultant will be happy to assist you with any queries you may have about your trip to Namibia.</p>
      <p>Regards<br><br>The Madbookings Team<br>(NWR, Namibia Booking Agent)</p>`,
    };
    transporter.sendMail(supplier, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200).send("Email successfully sent to recipient!");
      }
    });
  });
});
//Index page (static HTML)
app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/public/index.html");
});

/*************************************************/
// Express server listening...
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});