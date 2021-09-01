async function participantsCSV(){
    var fileInput = document.getElementById("csv"),

    
    reader = new FileReader();
    reader.onload = function () {
        data = reader.result;
        console.log(data);
        participants(data.toLowerCase());
    };
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput.files[0]);
}


async function participants(data){

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
        pDone = await fetch(url+'insert/participants',options);

        particID = await getPartic(curr_row[1]);

        eventID = await getEvent(sanitizer.sanitize("escape&eol",curr_row[3]));


        data3 = {
            "particID":particID,
            "eventID":eventID
        }

        opt3 = {
            method: 'POST',
            body: JSON.stringify(data3),
            headers: {'Content-Type': 'application/json'}
        }

        piDone = await fetch(url+"insert/participateIn",opt3);
        alert("Insert Complete");
    };
}

async function getPartic(particID){
    data = {
        "particID" :particID
    }

    opt = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    }
    let response = await fetch(url+'get/particID',opt);
    let data1 = await response.json();
    particID = data1.ID;
    return particID;
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
