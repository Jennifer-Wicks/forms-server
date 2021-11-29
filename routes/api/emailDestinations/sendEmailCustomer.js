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
    user: "boneswvb@gmail.com", //process.env.EMAIL,
    pass: "Wwim1234", //process.env.PASS,
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
router.post("/customer", (req, res) => {
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    // console.log("fields", fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });

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

    const mail = {
      from: `${data.email}`,
      replyTo: `${data.email}`,
      to: process.env.TOEMAIL, // receiver email,
      subject: `${data.book === undefined ? data.quote : data.book} ${data.arriveday1} ${data.resort1} \(${data.name} ${data.surname}\)`,
      html: `${newData.join(' ')}`
    };

    transporter.sendMail(mail, (err, data) => {
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


