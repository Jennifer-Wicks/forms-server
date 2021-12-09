const form = document.getElementById("contact-form");

const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();
  let supplier = new FormData(form);
  sendMail(supplier);
});

const sendMail = (supplier) => {
  fetch("http://localhost:5000/supplier", {
    method: "post",
    body: supplier,
  }).then((response) => {
    return response.json();
  });
};
