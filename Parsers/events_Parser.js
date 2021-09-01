async function eventsCSV(){
    var fileInput = document.getElementById("csv"),

    
    reader = new FileReader();
    reader.onload = function () {
        data = reader.result;
        console.log(data);
        events(data.toLowerCase());
    };
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput.files[0]);
}


async function events(data){

    const host = require("../Client/util/hostConfig.js");
    const url = host.getHostURL();
    const sanitizer = require("../Client/util/sanitizer.js");
    const rows = data.split('\n').slice(1);
    for(i = 0; i < rows.length;i++){
        if(rows[i].length < 1){
            continue;
        }
        const curr_row = rows[i].split(',');
    
        console.log(curr_row);
    
        
        fin_data = {
            "contactName": sanitizer.sanitize("escape",curr_row[9]),
            "contactEmail": sanitizer.sanitize("escape",curr_row[11]),
            "contactPhone": sanitizer.sanitize("dashes",curr_row[10]),
            "nameOfEvent": sanitizer.sanitize("escape",curr_row[0]),
            "regCost": curr_row[4],
            "eoYear": curr_row[1],
            "startDate": curr_row[5],
            "endDate": curr_row[6],
            "eCity": sanitizer.sanitize("escape",curr_row[3]),
            "frequency": curr_row[2],
            "maleFemaleBoth": curr_row[7],
            "childAdultBoth": sanitizer.sanitize("eol",curr_row[8])
        }
        // fin_data = {fType,indoorOutdoor,ActivityName,length,width,height};
        const options = {
            method: 'POST',
            body: JSON.stringify(fin_data),
            headers: {'Content-Type': 'application/json'}
        }
        
        console.log(options);
        returned = await fetch(url+'insert/events',options);

        eventID = await getEvent(sanitizer.sanitize("escape",curr_row[0]));

        ownerID = await getOwn(sanitizer.sanitize("escape",curr_row[12]));

        data4 = {
            "eventID":eventID,
            "ownerID":ownerID
        }
        const opt4 = {
            method: 'POST',
            body: JSON.stringify(data4),
            headers: {'Content-Type': 'application/json'}
        }

        hdone = await fetch(url+'insert/hostedBy',opt4);

        facID = await getFac(sanitizer.sanitize("escape&eol",curr_row[13]));
        eventID = await getEvent(sanitizer.sanitize("escape",curr_row[0]));
    
        data6 ={
            "facID":facID,
            "eventID":eventID
        }
        console.log(data6);
        opt6 = {
            method: 'POST',
            body: JSON.stringify(data6),
            headers: {'Content-Type': 'application/json'}
        }
        haDone = await fetch(url+'insert/heldAt',opt6);
        alert("Insert Complete");
    };
}

async function getEvent(eventName){
    data2 = {
        "eventName":eventName
    }
    const options2 = {
        method: 'POST',
        body: JSON.stringify(data2),
        headers: {'Content-Type': 'application/json'}
    }

    let response = await fetch(url+'get/eventID',options2);
    let data = await response.json();
    eventID = data.ID;
    return eventID;
}

async function getOwn(ownName){
    const data3 = {
        "ownerName": ownName
    }
    const opt3={
        method:'POST',
        body:JSON.stringify(data3),
        headers: {'Content-Type': 'application/json'}
    }

    let response = await fetch(url+'get/ownID',opt3);
    let data = await response.json();
    ownerID = data.ID;
    return ownerID;
}

async function getFac(facName){

    console.log(facName);
    data5 = {
        "facName" : facName
    }

    opt5 = {
        method: 'POST',
        body: JSON.stringify(data5),
        headers: {'Content-Type': 'application/json'}
    }
    let response = await fetch(url+'get/facID',opt5);
    let data = await response.json();
    facID = data.ID;
    return facID;
}

