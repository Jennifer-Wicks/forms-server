const formS = document.getElementById("contact-form");

const formEvent = formS.addEventListener("submit", (event) => {
  event.preventDefault();
  let mail = new FormData(formS);
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
