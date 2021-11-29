var campInfo = [
  { value: "Not Selected", name: "---Select A Camp---" },
  { value: "Ai Ais", name: "Ai Ais - Fish River Canyon" },
  { value: "Boplaas", name: "Boplaas" },
  { value: "Daan Viljoen", name: "Daan Viljoen" },
  { value: "Dead Valley Lodge", name: "Dead Valley Lodge" },
  { value: "Dolomite", name: "Dolomite - Etosha" },
  { value: "Duwisib", name: "Duwisib Castle" },
  { value: "Gross Barmen", name: "Gross Barmen - Okahandja" },
  { value: "Halali", name: "Halali - Etosha" },
  { value: "Hardap Resort", name: "Hardap Resort" },
  { value: "Hobas", name: "Hobas Camping - Fish River" },
  { value: "Jakkulsputz", name: "Jakkulsputz" },
  { value: "Khorixas", name: "Khorixas Rest camp" },
  { value: "Mile 14", name: "Mile 14" },
  { value: "Mile 72", name: "Mile 72" },
  { value: "Mile 108", name: "Mile 108" },
  { value: "Naukluft Campsite", name: "Naukluft Campsite" },
  { value: "Namutoni", name: "Namutoni - Etosha" },
  { value: "Okuakuejo", name: "Okuakuejo - Etosha" },
  { value: "Olifantsrus Campsite", name: "Olifantsrus Campsite - Etosha" },
  { value: "Onkoshi", name: "Onkoshi - Etosha" },
  { value: "Popa Falls", name: "Popa Falls Camp" },
  { value: "Shark Island", name: "Shark Island - Luderitz" },
  { value: "Sesriem", name: "Sesriem - Namib Desert" },
  { value: "Sesriem Oshana", name: "Sesriem Oshana" },
  { value: "Sossus Dune", name: "Sossus Dune Lodge - Namib Desert" },
  { value: "Terrace Bay", name: "Terrace Bay - Skeleton Coast" },
  { value: "Torra Bay", name: "Torra Bay - Skeleton Coast" },
  { value: "Waterberg", name: "Waterberg Camp" },
  { value: "Windpomp 14", name: "Windpomp 14" }
]

let counter = 1;

function addToCounter() {
  counter = counter + 1;
}

//Add a table
var getForm = document.getElementById("add_extra_camp");

// Create a break line element
var br = document.createElement("br");

function addACamp() {

  // Create a table synamically
  var table = document.createElement("table");
  table.setAttribute("class", `thisCamp${counter}`)
  var createTR = document.createElement("tr");
  table.appendChild(createTR)

  var createTD = document.createElement("td");
  createTR.appendChild(createTD);
  var createP = document.createElement("p");
  createTD.appendChild(createP);
  var createStrong = document.createElement("strong");
  createP.appendChild(createStrong);
  createStrong.textContent = `Booking ${counter}: Which Resort Would you like to travel to?`;

  table.appendChild(br.cloneNode());

  var select = document.createElement("select");
  select.name = `resort${counter}`;
  select.id = `resort${counter}`
  createP.appendChild(select)

  for (const val of campInfo) {
    var option = document.createElement("option")
    option.value = val.value;
    option.text = val.name;
    select.add(option)
  }

  var createTD = document.createElement("td");
  createTR.appendChild(createTD);
  var createP = document.createElement("p");
  createTD.appendChild(createP);
  var createStrong = document.createElement("strong");
  createP.appendChild(createStrong);
  createStrong.textContent = "What Type of Accommodation do you require?";

  var createInput = document.createElement("input");
  createInput.name = `accomtype${counter}`;
  createInput.id = `accomtype${counter}`;
  createInput.type = "text";
  createP.appendChild(createInput);

  var createTR = document.createElement("tr");
  table.appendChild(createTR)

  var createTD = document.createElement("td");
  createTR.appendChild(createTD);
  createTD.textContent = "Arrival Date:";
  createTD.appendChild(br.cloneNode());

  var createInputDate1 = document.createElement("input");
  createInputDate1.name = `arriveday${counter}`;
  createInputDate1.id = `arriveday${counter}`;
  createInputDate1.type = "date";
  createTR.appendChild(createTD)
  createTD.appendChild(createInputDate1)

  var createTD = document.createElement("td");
  createTR.appendChild(createTD);
  createTD.textContent = "Departure Date:";
  createTD.appendChild(br.cloneNode());

  var createInputDate2 = document.createElement("input");
  createInputDate2.name = `departday${counter}`;
  createInputDate2.id = `departday${counter}`;
  createInputDate2.type = "date";
  createTR.appendChild(createTD)
  createTD.appendChild(createInputDate2)

  var createTR = document.createElement("tr");
  table.appendChild(createTR)

  var createTD = document.createElement("td");
  createTR.appendChild(createTD);

  var createButton = document.createElement('button');
  createButton.textContent = "Delete This Camp";
  createButton.setAttribute("id", "deleteCamp");
  createButton.setAttribute("type", "button");
  createButton.setAttribute("class", "btn btn-danger");
  table.appendChild(createButton)
  createButton.setAttribute("onClick", "remove(this)");

  getForm.appendChild(table);
}

function remove(elem) {
  elem.parentNode.remove(elem);
}
