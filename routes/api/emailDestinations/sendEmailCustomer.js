const express = require('express');
const date = require('date-and-time');

const router = express.Router();

const multiparty = require("multiparty");
const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

router.get('/customer', async function (req, res) {
  res.json("Customer form")
});

var transport = nodemailer.createTransport(smtpTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
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
router.post("/customer", (req, res) => {
  let form = new multiparty.Form();
  let data = {};
  let newData = [];
  form.parse(req, function (err, fields) {
    // console.log("fields", fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });

    function insertInfo() {
      // amend to update below
      const pattern = date.compile('ddd, DD MMM YYYY [GMT]Z');

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
        // if (strName.slice(0, 4) === "adul") {
        //   newData.push(`<p>&nbsp;</p>`);
        // }
        if (strName.slice(0, 4) === "reso") {
          newData.push(`<p>&nbsp;</p>`);
        }
        if (strName.slice(0, 4) === "comm") {
          newData.push(`<p>&nbsp;</p>`);
        }
        if (strName.slice(0, 3) === "g-re") {
          strValue = "True"
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
    insertInfo();
    const mail = {
      from: `${data.email}`,
      replyTo: `${data.email}`,
      to: process.env.TOEMAIL, // receiver email,
      subject: `${data.arriveday1} ${data.book === undefined ? data.quote : data.book}  ${data.resort1} \(${data.name} ${data.surname}\)`,
      html: `${newData.join(' ')}`
    };

    transport.sendMail(mail, (err, data) => {
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


