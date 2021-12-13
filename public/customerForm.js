const form = document.getElementById("contact-form");
const formSucc = document.getElementById("contact-form");
const formBook = document.getElementById("contact-form");
const formSup = document.getElementById("contact-form");
const inputElement = document.getElementById("input");
let fileList = [];

function validateForm() {
  let x = document.forms["contact-form"]["email"].value;
  let y = document.forms["contact-form"]["emailcheck"].value;
  if (x !== y) {
    alert("Please recheck your email adressess");
    return false;
  }
}

let arr = [];
var cb = document.getElementById('quote')
const formEvent = form.addEventListener("submit", (event) => {
  cb.checked
    ? arr = [
      // "http://localhost:5000/api/sendEmailCustomer/customer",
      // "http://localhost:5000/api/sendEmailSupplier/supplier"
      // to be used later "https://mad-email-server.herokuapp.com/api/sendEmailCustomeSuccessQuote/formsuccessQuote",
      "https://mad-email-server.herokuapp.com/api/sendEmailCustomer/customer",
      "https://mad-email-server.herokuapp.com/api/sendEmailSupplier/supplier"
    ]
    : arr = [
      // "http://localhost:5000/api/sendEmailCustomer/customer",
      // "http://localhost:5000/api/sendEmailSupplier/supplier"
      // // to be used later "https://mad-email-server.herokuapp.com/api/sendEmailCustomeSuccessBook/formsuccessBook",
      "https://mad-email-server.herokuapp.com/api/sendEmailCustomer/customer",
      "https://mad-email-server.herokuapp.com/api/sendEmailSupplier/supplier"
    ];
  event.preventDefault();
  let mail = new FormData(form);
  let formsuccessQuote = new FormData(formSucc);
  let formsuccessBook = new FormData(formBook)
  let supplier = new FormData(formSup);
  sendMail(mail, formsuccessQuote, formsuccessBook, supplier, fileList);
});

const sendMail = (mail, formsuccessQuote, formsuccessBook, supplier) => {
  let requests = arr.map(urls => {
    fetch(urls, {
      method: "post",
      body: mail, formsuccessQuote, formsuccessBook, supplier,
    }).then((response) => {
      return response.json();
    });
    cb.checked
      ? window.location = '/public/formsuccessQuote.html'
      : window.location = '/public/formsuccessBook.html'
  });
  return requests
}

// function handleFiles() {
//   fileList = this.files; /* now you can work with the file list */
//   // console.log("Selected files", fileList)
// }

// inputElement.addEventListener("change", handleFiles, false);

// _spBodyOnLoadFunctionNames.push("GetUrl");

function GetUrl() {
  const previousPage = document.referrer;
  const firstOPtion = document.getElementById("firstCamp");
  const camps = [
    { "ai-ais": "Ai Ais - Fish River Canyon" },
    { "boplaas": "Boplaas" },
    { "daan-viljoen": "Daan Viljoen" },
    { "dead-valley-lodge": "Dead Valley Lodge" },
    { "dolomite": "Dolomite - Etosha" },
    { "duwisib": "Duwisib Castle" },
    { "gross-barmen": "Gross Barmen - Okahandja" },
    { "halali": "Halali - Etosha" },
    { "hardap": "Hardap Resort" },
    { "hobas": "Hobas Camping - Fish River" },
    { "jakkulsputz": "Jakkulsputz" },
    { "khorixas": "Khorixas Rest camp" },
    { "mile-14": "Mile 14" },
    { "mile-72": "Mile 72" },
    { "mile-108": "Mile 108" },
    { "naukluft": "Naukluft Campsite" },
    { "namutoni": "Namutoni - Etosha" },
    { "okaukuejo": "Okaukuejo - Etosha" },
    { "olifantsrus": "Olifantsrus Campsite - Etosha" },
    { "onkoshi": "Onkoshi - Etosha" },
    { "popa-falls": "Popa Falls Camp" },
    { "shark-island": "Shark Island - Luderitz" },
    { "sesriem": "Sesriem - Namib Desert" },
    { "sesriem-oshana": "Sesriem Oshana" },
    { "sossus-dune": "Sossus Dune Lodge - Namib Desert" },
    { "terrace-bay": "Terrace Bay - Skeleton Coast" },
    { "torra-bay": "Torra Bay - Skeleton Coast" },
    { "waterberg": "Waterberg Camp" },
    { "windpomp-14": "Windpomp 14" }
  ];

  let camp = [previousPage.split("/")]
  let newCamp = "";

  for (i = 0; i < camp.length; i++) {
    newCamp = camp[i].slice(-1).toString();
  }

  for (strName in camps) {
    strValue = camps[strName]
    for (strNameOne in strValue) {
      strValueOne = strValue[strNameOne];
      newCampOne = strNameOne.toString();
      let identifiedCamp = newCamp.includes(newCampOne);
      if (identifiedCamp) {
        firstOPtion.textContent = strValueOne; //Add slice to cap first letter
        firstOPtion.setAttribute("value", strNameOne)
      }
    }
  }
}