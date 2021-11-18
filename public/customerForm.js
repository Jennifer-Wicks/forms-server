const form = document.getElementById("contact-form");

// const SADCCountries = [
//   "Angola",
//   "Botswana",
//   "Comoros",
//   "Democratic Republic of Congo",
//   "Eswatini",
//   "Lesotho",
//   "Madagascar",
//   "Malawi",
//   "Mauritius",
//   "Mozambique",
//   "Namibia",
//   "Seychelles",
//   "South Africa",
//   "Tanzania",
//   "Zambia",
//   "Zimbabwe"
// ]

function validateForm() {
  let x = document.forms["contact-form"]["email"].value;
  let y = document.forms["contact-form"]["emailcheck"].value;
  if (x !== y) {
    alert("Please recheck your email adressess");
    return false;
  }
}

const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();
  let mail = new FormData(form);
  sendMail(mail);
});

const sendMail = (mail) => {
  fetch("http://localhost:5000/customer", {
    method: "post",
    body: mail,
  }).then((response) => {
    return response.json();
  });
};

// function myFunction() {
//   var x = document.getElementById("arriveday1").value.split('-');
//   console.log("Date", x[2] + '/' + x[1] + '/' + x[0])
// }

// const bookQuote = "";

// const onClick = function () {
//   let x = this.id
//   bookQuote = x
// }
// document.getElementById('book').onclick = onClick;
// document.getElementById('quote').onclick = onClick;
// console.log("bookquote", bookQuote)