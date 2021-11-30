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

let arr = [];
const formEvent = form.addEventListener("submit", (event) => {
  var cb = document.getElementById('quote')
  cb.checked
    ? arr = [
      "https://mad-email-server.herokuapp.com/api/sendEmailCustomer/customer",
      "https://mad-email-server.herokuapp.com/api/sendEmailCustomeSuccessQuote/formsuccessQuote",
      "https://mad-email-server.herokuapp.com/api/sendEmailSupplier/supplier"
    ]
    : arr = [
      "https://mad-email-server.herokuapp.com/api/sendEmailCustomer/customer",
      "https://mad-email-server.herokuapp.com/api/sendEmailCustomeSuccessBook/formsuccessBook",
      "https://mad-email-server.herokuapp.com/api/sendEmailSupplier/supplier"
    ];
  event.preventDefault();
  let mail = new FormData(form);
  let formsuccessQuote = new FormData(formSucc);
  let formsuccessBook = new FormData(formBook)
  let supplier = new FormData(formSup);
  sendMail(mail, formsuccessQuote, formsuccessBook, supplier);
});

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
