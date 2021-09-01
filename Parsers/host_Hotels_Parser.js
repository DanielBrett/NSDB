async function hosthotelsCSV(){
    var fileInput = document.getElementById("csv"),

    
    reader = new FileReader();
    reader.onload = function () {
        data = reader.result;
        console.log(data);
        hosthotels(data.toLowerCase());
    };
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput.files[0]);
}


async function hosthotels(data){
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

        data1 = {
            "hotelName": sanitizer.sanitize("escape",curr_row[0]),
            "hhPostalCode": curr_row[1].replace(/\s+/g, '')
        };

        opt1 = {
            method: 'POST',
            body: JSON.stringify(data1),
            headers: {'Content-Type': 'application/json'} 
        };

        hhDone = await fetch(url+"insert/hostHotels",opt1);
        
        hotelID = await getHotel(sanitizer.sanitize("escape",curr_row[0]));

        eventID = await getEvent(sanitizer.sanitize("escape&eol",curr_row[2]));

        data3 = {
            "hotelID":hotelID,
            "eventID":eventID
        };

        opt3 = {
            method: 'POST',
            body: JSON.stringify(data3),
            headers: {'Content-Type': 'application/json'} 
        };

        rDone = await fetch(url+"insert/reserves",opt3);
        alert("Insert Complete");

    };
}

async function getHotel(hotelName){
    data2 = {
        "hotelName":hotelName
    }

    opt2 = {
        method: 'POST',
        body: JSON.stringify(data2),
        headers: {'Content-Type': 'application/json'} 
    }

    let response = await fetch(url+"get/hotelID",opt2);
    let data = await response.json();
    hotelID = data.ID;
    return hotelID;
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


