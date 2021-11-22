const form = document.getElementById("contact-form");
const formSucc = document.getElementById("contact-form");
const formBook = document.getElementById("contact-form");
const formSup = document.getElementById("contact-form");

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
  let formsuccessQuote = new FormData(formSucc);
  let formsuccessBook = new FormData(formBook);
  let supplier = new FormData(formSup);
  sendMail(mail, formsuccessQuote, formsuccessBook, supplier);
});

let arr = [
  "http://localhost:5000/api/sendEmailCustomer/customer",
  "http://localhost:5000/api/sendEmailCustomeSuccessQuote/formsuccessQuote",
  "http://localhost:5000/api/sendEmailCustomeSuccessBook/formsuccessBook",
  "http://localhost:5000/api/sendEmailSupplier/supplier"
];

const sendMail = (mail, formsuccessQuote, formsuccessBook, supplier) => {
  let requests = arr.map(urls => {
    fetch(urls, {
      method: "post",
      body: mail, formsuccessQuote, formsuccessBook, supplier,
    }).then((response) => {
      return response.json();
    });
  });
}
