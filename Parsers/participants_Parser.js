
const host = require("../Client/util/hostConfig.js");
const url = host.getHostURL();
const sanitizer = require("../Client/util/sanitizer.js");


async function participantsCSV(){
    var fileInput = document.getElementById("csv"),
    reader = new FileReader();
    reader.onload = function () {
        let data = reader.result;
        console.log(data);
        participants(data.toLowerCase());
    };
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput.files[0]);
}


async function participants(data){
    
    
    const rows = data.split('\n').slice(1);

    for(let i = 0; i < rows.length;i++){
        if(rows[i].length < 1){
            continue;
        }
        const curr_row = rows[i].split(',');
    
        console.log(curr_row);
    
        
        let fin_data = {
            "pPostCode": sanitizer.sanitize("removespace",curr_row[1]),
            "teamSize": curr_row[0],
            "pCity": sanitizer.sanitize("escape",curr_row[2])
        }
        // fin_data = {fType,indoorOutdoor,ActivityName,length,width,height};
        const options = {
            method: 'POST',
            body: JSON.stringify(fin_data),
            headers: {'Content-Type': 'application/json'}
        }
        
        console.log(options);
        var pDone = await fetch(url+'insert/participants',options);

        var particID = await getPartic(curr_row[1]);

        let eventID = await getEvent(sanitizer.sanitize("escape&eol",curr_row[3]));


        let data3 = {
            "particID":particID,
            "eventID":eventID
        }

        const opt3 = {
            method: 'POST',
            body: JSON.stringify(data3),
            headers: {'Content-Type': 'application/json'}
        }

        let piDone = await fetch(url+"insert/participateIn",opt3);
        alert("Insert Complete");
    };
}

async function getPartic(particID){
    let data = {
        "particID" :particID
    }

    let opt = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    }
    const url = host.getHostURL();
    let response = await fetch(url+'get/particID');
    let data1 = await response.json();
    particID = data1.ID;
    return particID;
}

async function getEvent(eventName){
    let data2 = {
        "eventName":eventName
    }
    const options2 = {
        method: 'POST',
        body: JSON.stringify(data2),
        headers: {'Content-Type': 'application/json'}
    }
    const url = host.getHostURL();
    let response = await fetch(url+'get/eventID',options2);
    let data = await response.json();
    let eventID = data.ID;
    return eventID;
}


module.exports = {participantsFunc: participantsCSV};
