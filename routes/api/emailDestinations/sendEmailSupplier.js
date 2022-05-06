const express = require('express');
const date = require('date-and-time');

const router = express.Router();

const multiparty = require("multiparty");
const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

router.get('/supplier', async function (req, res) {
  res.json("supplier form")
});

var transport = nodemailer.createTransport(smtpTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  }
}));

// verify connection configuration
transport.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

//Send customer booking form to MB
router.post("/supplier", (req, res) => {
  let formSup = new multiparty.Form();
  let data = {};
  formSup.parse(req, function (err, fields) {
    // console.log("fields", fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });
    // console.log("data", data);
    var newData = []

    function insertInfo() {
      // amend to update below
      const pattern = date.compile('ddd, DD MMM YYYY');

      for (strName in data) {
        strValue = data[strName]
        if (strName.slice(0, 4) === "arri") {
          const now = new Date(strValue);
          data[strName] = date.format(now, pattern);
        }
        if (strName.slice(0, 4) === "depa") {
          const now = new Date(strValue);
          data[strName] = date.format(now, pattern);
        }
      }

      for (strName in data) {
        strValue = data[strName]
        if (strName.slice(0, 4) === "reso"
          || strName.slice(0, 4) === "acco"
          || strName.slice(0, 4) === "arri"
          || strName.slice(0, 4) === "depa"
          || strName.slice(0, 4) === "adul"
          || strName.slice(0, 7) === "childno"
          || strName.slice(0, 7) === "childha"
        ) {
          if (strName.slice(0, 4) === "reso") {
            strName = "Resort"
            newData.push(`<p>&nbsp;</p>`);
          }
          if (strName.slice(0, 4) === "acco") {
            strName = "Accommodation Type"
          }
          if (strName.slice(0, 4) === "arri") {
            strName = "Arrival date"
          }
          if (strName.slice(0, 4) === "depa") {
            strName = "Departure Date"
          }
          if (strName.slice(0, 4) === "adul") {
            strName = "Adults"
          }
          if (strName.slice(0, 7) === "childno") {
            strName = "Child (0 - 5) - No Charge"
          }
          if (strName.slice(0, 7) === "childha") {
            strName = "Child (6 - 12) - Paying 50%"
          }
          newData.push(`<p><strong>${strName}:</strong> ${strValue}</p>`);
        }
      }
    }
    insertInfo();

    const supplier = {
      to: process.env.TOEMAIL, // receiver email,
      subject: `New Booking: ${data.arriveday1} ${data.resort1} \(${data.name} ${data.surname} \)`,
      html: `<h3> Dear Oryx</h3 >
        <p>Please make the following reservation for me: <strong style="color: red;">1 Booking</strong></p>
        <p><strong>Reservation Name:</strong> ${data.name} ${data.surname}</p> 
       ${newData.join(" ")}
        <p>&nbsp;</p>
        <p>I look forward to your confirmation.</p>
        <p>&nbsp;</p>
        <p>Rep 3</p>
        <p>Madbookings</p>`,
    };
    transport.sendMail(supplier, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200).send("the email successfully sent to recipient!");
      }
    });
  });
});

module.exports = router;