const express = require('express');

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
  form.parse(req, function (err, fields) {
    console.log("fields", fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });

    var strName, strValue;
    var newData = []

    function insertInfo() {
      let switchDateArr = data.arriveday1.slice(5, 7);
      let switchDateDep = data.departday1.slice(5, 7);
      let arrMonth = "";
      let depMonth = "";

      switch (switchDateArr) {
        case "01":
          arrMonth = "Jan"
          break;
        case "02":
          arrMonth = "Feb";
          break;
        case "03":
          arrMonth = "Mar";
          break;
        case "04":
          arrMonth = "Apr";
          break;
        case "05":
          arrMonth = "May";
          break;
        case "06":
          arrMonth = "Jun";
          break;
        case "07":
          arrMonth = "Jul";
          break;
        case "08":
          arrMonth = "Aug";
          break;
        case "09":
          arrMonth = "Sep";
          break;
        case "10":
          arrMonth = "Oct";
          break;
        case "11":
          arrMonth = "Nov";
          break;
        case "12":
          arrMonth = "Dec";
          break;
        default:
          arrMonth = "Not selected";
      }

      switch (switchDateDep) {
        case "01":
          depMonth = "Jan"
          break;
        case "02":
          depMonth = "Feb";
          break;
        case "03":
          depMonth = "Mar";
          break;
        case "04":
          depMonth = "Apr";
          break;
        case "05":
          depMonth = "May";
          break;
        case "06":
          depMonth = "Jun";
          break;
        case "07":
          depMonth = "Jul";
          break;
        case "08":
          depMonth = "Aug";
          break;
        case "09":
          depMonth = "Sep";
          break;
        case "10":
          depMonth = "Oct";
          break;
        case "11":
          depMonth = "Nov";
          break;
        case "12":
          depMonth = "Dec";
          break;
        default:
          depMonth = "Not selected";
      }
      var wrongDateArr = data.arriveday1.split("-");
      var wrongDateDep = data.departday1.split("-");
      let changedDateArr = wrongDateArr[2] + " " + arrMonth + " " + wrongDateArr[0];
      let changedDateDep = wrongDateDep[2] + " " + depMonth + " " + wrongDateDep[0];
      data.arriveday1 = changedDateArr;
      data.departday1 = changedDateDep;

      for (strName in data) {
        strValue = data[strName]
        if (strName.slice(0, 4) === "adul") {
          newData.push(`<p>&nbsp;</p>`);
        }
        if (strName.slice(0, 4) === "reso") {
          newData.push(`<p>&nbsp;</p>`);
        }
        if (strName.slice(0, 4) === "comm") {
          newData.push(`<p>&nbsp;</p>`);
        }
        if (strName === "g-recaptcha-response") {
          null
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


