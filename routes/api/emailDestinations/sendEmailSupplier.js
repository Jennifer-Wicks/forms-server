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
    var strName, strValue;
    var newData = []

    function insertInfo() {
      let switchDateArr = "";
      let switchDateDep = "";

      for (strName in data) {
        strValue = data[strName]
        if (strName.slice(0, 7) === "arrived") {
          switchDateArr = strValue.slice(5, 7);
        }
        if (strName.slice(0, 7) === "departd") {
          switchDateDep = strValue.slice(5, 7);
        }
      }

      let monthArr = "";
      switch (switchDateArr) {
        case "01":
          monthArr = "Jan"
          break;
        case "02":
          monthArr = "Feb";
          break;
        case "03":
          monthArr = "Mar";
          break;
        case "04":
          monthArr = "Apr";
          break;
        case "05":
          monthArr = "May";
          break;
        case "06":
          monthArr = "Jun";
          break;
        case "07":
          monthArr = "Jul";
          break;
        case "08":
          monthArr = "Aug";
          break;
        case "09":
          monthArr = "Sep";
          break;
        case "10":
          monthArr = "Oct";
          break;
        case "11":
          monthArr = "Nov";
          break;
        case "12":
          monthArr = "Dec";
          break;
        default:
          monthArr = "Not selected";
      }

      let monthDep = "";

      switch (switchDateDep) {
        case "01":
          monthDep = "Jan"
          break;
        case "02":
          monthDep = "Feb";
          break;
        case "03":
          monthDep = "Mar";
          break;
        case "04":
          monthDep = "Apr";
          break;
        case "05":
          monthDep = "May";
          break;
        case "06":
          monthDep = "Jun";
          break;
        case "07":
          monthDep = "Jul";
          break;
        case "08":
          monthDep = "Aug";
          break;
        case "09":
          monthDep = "Sep";
          break;
        case "10":
          monthDep = "Oct";
          break;
        case "11":
          monthDep = "Nov";
          break;
        case "12":
          monthDep = "Dec";
          break;
        default:
          monthDep = "Not selected";
      }
      // amend to update below
      for (strName in data) {
        strValue = data[strName]
        if (strName.slice(0, 4) === "arri") {
          wrongDateArr = strValue.split("-");
          let changedDateArr = wrongDateArr[2] + " " + monthArr + " " + wrongDateArr[0];
          data[strName] = changedDateArr;
        }
        if (strName.slice(0, 4) === "depa") {
          wrongDateDep = strValue.split("-");
          let changedDateDep = wrongDateDep[2] + " " + monthArr + " " + wrongDateDep[0];
          data[strName] = changedDateDep;
        }
      }

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
        newData.push(`<p><strong>${strName}:</strong> ${strValue}</p>`);
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