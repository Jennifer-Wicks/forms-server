import { date } from 'date-and-time'

const now = new Date();
console.log("date test")


const data = {
  "arrival date": now,
  "Departure date": now + 1
}


function insertInfo() {
  for (strName in data) {
    strValue = data[strName]
    const pattern = date.compile('DD MMM YYYY');
    if (strName.slice(0, 4) === "arri") {
      const now = new Date(strValue);
      console.log(date)
      strValue = date.format(now, pattern);
      console.log('now')
    }
    // if (strName.slice(0, 4) === "depa") {
    //   data[strName] = pattern;
    // }
  }
}
insertInfo()
