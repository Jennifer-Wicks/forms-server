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
// transporter.verify(function (error, success) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Server is ready to take our messages");
//   }
// });

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
    console.log("data", data);
    var strName, strValue;
    var newData = []

    function insertInfo() {
      var wrongDateArr = data.arriveday1.split("-");
      var wrongDateDep = data.departday1.split("-");
      let changedDateArr = wrongDateArr[2] + "/" + wrongDateArr[1] + "/" + wrongDateArr[0];
      let changedDateDep = wrongDateDep[2] + "/" + wrongDateDep[1] + "/" + wrongDateDep[0];
      data.arriveday1 = changedDateArr;
      data.departday1 = changedDateDep;

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
            strName = "Arrivale date"
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