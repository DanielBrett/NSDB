const host = require("../Client/util/hostConfig.js");
const url = host.getHostURL();
const sanitizer = require("../Client/util/sanitizer.js");

async function containsCSV(){
    var fileInput = document.getElementById("csv"),

    
    reader = new FileReader();
    reader.onload = function () {
        let data = reader.result;
        console.log(data);
        contains(data.toLowerCase());
    };
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput.files[0]);
}

async function contains(data){


    const rows = data.split('\n').slice(1);
    console.log(rows);
    for(let i = 0; i < rows.length;i++){
        if(rows[i].length < 1){
            continue;
        }
        const curr_row = rows[i].split(',');
    
        console.log(curr_row);

        let eventID = await getEvent(sanitizer.sanitize("escape&eol",curr_row[1]));

        let data5 = {
            "divisionName": sanitizer.sanitize("escape",curr_row[0])
        }
        const opt5 = {
            method: 'POST',
            body: JSON.stringify(data5),
            headers: {'Content-Type': 'application/json'}
        }

        let dDone = await fetch(url+"insert/division",opt5);

        let divID = await getDiv(sanitizer.sanitize("escape",curr_row[0]));


        var data3 = {
            "divID":divID,
            "eventID":eventID  
        }

        var opt3 = {
            method: 'POST',
            body: JSON.stringify(data3),
            headers: {'Content-Type': 'application/json'}
        }

        let cdone = await fetch(url+'insert/contains',opt3);
        alert("Insert Complete");
    };
}

async function getEvent(eventName){
    let data = {
        "eventName":eventName
    }
    const opt = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    }

    let response = await fetch(url+'get/eventID',opt);
    let data1 = await response.json();
    let eventID = data1.ID;
    return eventID;
}

async function getDiv(divName){
    let data2 = {
        "divisionName": divName
    }

    const opt2 = {
        method: 'POST',
        body: JSON.stringify(data2),
        headers: {'Content-Type': 'application/json'}
    }

    let response = await fetch(url+'get/divID',opt2);
    let data = await response.json();
    let divID = data.ID;
    return divID;
}

module.exports = {containsFunc: containsCSV};






