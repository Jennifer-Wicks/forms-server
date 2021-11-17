const camps = [];

// setTimeout(() => {
//   console.log(camps[])
// }, 5000);

const getAllPrices = async () => {
  try {
    const response = await fetch('http://www.madbookingsreviews.com/sql/employees')
    const jsonData = await response.json()
    for (let i = 0; i < jsonData.length; i++) {
      camps.push(jsonData[i])
    }
  }
  catch (err) {
    console.error(err.message)
  }
};
getAllPrices();

setTimeout(function () {
  const insertBody = () => {

    camps.forEach(data => {
      var div = document.getElementById('allPrices');


      const createTBody = document.createElement('tbody');
      div.appendChild(createTBody);

      var createTR = document.createElement('tr');
      createTBody.appendChild(createTR);

      var createTD = document.createElement('td');
      createTR.appendChild(createTD);
      createTD.textContent = data.first_name;

      var createTD = document.createElement('td');
      createTR.appendChild(createTD);
      createTD.textContent = data.last_name;

      var createTD = document.createElement('td');
      createTR.appendChild(createTD);
      createTD.textContent = data.title;

      var createTD = document.createElement('td');
      createTR.appendChild(createTD);
      createTD.textContent = data.address;
    });
  }
  insertBody();

}, 3000);