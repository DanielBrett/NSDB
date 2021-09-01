async function containsCSV(){
    var fileInput = document.getElementById("csv"),

    
    reader = new FileReader();
    reader.onload = function () {
        data = reader.result;
        console.log(data);
        contains(data.toLowerCase());
    };
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput.files[0]);
}

async function contains(data){


    const host = require("../Client/util/hostConfig.js");
    const url = host.getHostURL();
    const sanitizer = require("../Client/util/sanitizer.js");

    const rows = data.split('\n').slice(1);
    console.log(rows);
    for(i = 0; i < rows.length;i++){
        if(rows[i].length < 1){
            continue;
        }
        const curr_row = rows[i].split(',');
    
        console.log(curr_row);

        eventID = await getEvent(sanitizer.sanitize("escape&eol",curr_row[1]));

        data5 = {
            "divisionName": sanitizer.sanitize("escape",curr_row[0])
        }
        opt5 = {
            method: 'POST',
            body: JSON.stringify(data5),
            headers: {'Content-Type': 'application/json'}
        }

        dDone = await fetch(url+"insert/division",opt5);

        divID = await getDiv(sanitizer.sanitize("escape",curr_row[0]));


        data3 = {
            "divID":divID,
            "eventID":eventID  
        }

        opt3 = {
            method: 'POST',
            body: JSON.stringify(data3),
            headers: {'Content-Type': 'application/json'}
        }

        cdone = await fetch(url+'insert/contains',opt3);
    };
}

async function getEvent(eventName){
    data = {
        "eventName":eventName
    }
    const opt = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    }

    let response = await fetch(url+'get/eventID',opt);
    let data1 = await response.json();
    eventID = data1.ID;
    return eventID;
}

async function getDiv(divName){
    data2 = {
        "divisionName": divName
    }

    opt2 = {
        method: 'POST',
        body: JSON.stringify(data2),
        headers: {'Content-Type': 'application/json'}
    }

    let response = await fetch(url+'get/divID',opt2);
    let data = await response.json();
    divID = data.ID;
    return divID;
}






