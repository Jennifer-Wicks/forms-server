var strName, strValue ;

for(strName in oObject)
{
strValue = oObject[strName] ;
alert("name : " + strName + " : value : " + strValue) ;
}


`<p><strong>Name:</strong> ${data.name}</p> 
<p><strong>Surname:</strong> ${data.surname}</p>
<p><strong>Nationality:</strong> ${data.nationality}</p>
<p><strong>Telephone number:</strong> ${data.tel}</p>
<p><strong>Email:</strong> ${data.email}</p>         
<p><strong>Email check:</strong> ${data.emailcheck}</p>
<p><strong>Adults:</strong> ${data.adults}</p>
<p><strong>Child 1-5:</strong> ${data.childnopay}</p>
<p><strong>Child 6-12:</strong> ${data.childhalfprice}</p>

<p><strong>Resort 1:</strong> ${data.resort1}</p>
<p><strong>Accomtype 1:</strong> ${data.accomtype1}</p>
<p><strong>Arriveday 1:</strong> ${data.arriveday1}</p>
<p><strong>Departday 1:</strong> ${data.departday1}</p>


<p><strong>Comments:</strong> ${data.comments}</p>
<p><strong>News letter:</strong> ${data.newsletter !== undefined ? data.newsletter : "No newsletter"
}</p>`,


// if (strName.slice(0, 5) === "resor" ||
    //   strName.slice(0, 5) === "accom" ||
    //   strName.slice(0, 5) === "arriv" ||
    //   strName.slice(0, 5) === "depar"
    // ) {}

    
    let campdata = [];
    var strName, strValue;
    function insertInfo() {
      for (strName in data) {
        strValue = data[strName].toString()
        campdata.push({ strName: strValue })
        return (`<p><strong>${strName}: </strong>${strValue}</p>`)
      }
    }
    console.log("campdata", campdata)