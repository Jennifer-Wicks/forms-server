const form = document.getElementById("contact-form");

const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();
  let formsuccess = new FormData(form);
  sendMail(formsuccess);
});

const sendMail = (formsuccess) => {
  fetch("http://localhost:5000/formsuccess", {
    method: "post",
    body: formsuccess,
  }).then((response) => {
    return response.json();
  });
};
