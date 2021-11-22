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

//Send customer booking form to MB
router.post("/supplier", (req, res) => {
  let formSup = new multiparty.Form();
  // console.log("formSup", formSup)
  let data = {};
  formSup.parse(req, function (err, fields) {
    // console.log("fields", fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });
    // console.log("data", data);
    function changeDateFormat() {
      var wrongDateArr = data.arriveday1.split("-");
      var wrongDateDep = data.departday1.split("-");
      let changedDateArr = wrongDateArr[2] + "/" + wrongDateArr[1] + "/" + wrongDateArr[0];
      let changedDateDep = wrongDateDep[2] + "/" + wrongDateDep[1] + "/" + wrongDateDep[0];
      data.arriveday1 = changedDateArr;
      data.departday1 = changedDateDep;
    }
    changeDateFormat();
    const supplier = {
      to: process.env.TOEMAIL, // receiver email,
      subject: `Supplier ${data.arriveday1} ${data.resort1} \(${data.name} ${data.surname} \)`,
      html: `<h3> Dear Oryx</h3 >
        <p>Please make the following Reservation for me: <strong style="color: red;">1 Booking</strong></p>
        <p>&nbsp;</p>
        <p><strong>Reservation Name:</strong> ${data.name} ${data.surname}</p> 
        <p>&nbsp;</p>        
        <p><strong>Lodge Name:</strong> ${data.resort1}</P>
        <p><strong>Arrive:</strong> ${data.arriveday1}</p>
        <p><strong>Depart:</strong> ${data.departday1}</p>
        <p><strong>Adults:</strong> ${data.adults}</p>
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
        res.status(200).send("The email successfully sent to recipient!");
      }
    });
  });
});

module.exports = router;