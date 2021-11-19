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
router.post("/customer", (req, res) => {
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    console.log("fields", fields);
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
    const mail = {
      from: `${data.email}`,
      replyTo: `${data.email}`,
      to: process.env.TOEMAIL, // receiver email,
      subject: `client ${data.book === undefined ? data.quote : data.book} ${data.arriveday1
        } ${data.resort1} \(${data.name} ${data.surname}\)`,
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
        <p><strong>News letter:</strong> ${data.newsletter !== undefined ? data.newsletter : "No newsletter"
        }</p>`,
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