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
  // secureConnection: false, // TLS requires secureConnection to be false
  // port: 587, // port for secure SMTP
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
  // let fileData = [];
  form.parse(req, function (err, fields) { //fileList
    // console.log("fields", fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
      // console.log("fileList", fileList.uploadFile);

      // fileData.push(fileList.uploadFile);
    });
    // console.log("fileData", fileData);

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
      html: `${newData.join(' ')}
        <br />
        Received from: http://www.aiaisresort.com/`,
      // <br />Embedded image: <img src="./public/cid:kasane-location-map.gif"/> <br />Embedded image: <img src="cid:./public/201040.pdf"/>`,
      // attachments: [
      //   {
      //     filename: 'image.png',
      //     path: './public/kasane-location-map.gif',
      //     cid: 'kasane-location-map.gif' //same cid value as in the html img src
      //   },
      //   {
      //     filename: '201040.pdf',
      //     path: './public/201040.pdf',
      //     cid: 'unique@kreata.ee' //same cid value as in the html img src
      //   }
      // ]
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


