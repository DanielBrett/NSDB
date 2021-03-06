const host = require("../Client/util/hostConfig.js");
const url = host.getHostURL();
const sanitizer = require("../Client/util/sanitizer.js");

async function hosthotelsCSV(){
    var fileInput = document.getElementById("csv"),

    
    reader = new FileReader();
    reader.onload = function () {
        let data = reader.result;
        console.log(data);
        hosthotels(data.toLowerCase());
    };
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput.files[0]);
}


async function hosthotels(data){
    
    const rows = data.split('\n').slice(1);

    for(let i = 0; i < rows.length;i++){
        if(rows[i].length < 1){
            continue;
        }
        const curr_row = rows[i].split(',');
    
        console.log(curr_row);

        let data1 = {
            "hotelName": sanitizer.sanitize("escape",curr_row[0]),
            "hhPostalCode": curr_row[1].replace(/\s+/g, '')
        };

        const opt1 = {
            method: 'POST',
            body: JSON.stringify(data1),
            headers: {'Content-Type': 'application/json'} 
        };

        
        let hhDone = await fetch(url+"insert/hostHotels",opt1);
        
        let hotelID = await getHotel(sanitizer.sanitize("escape",curr_row[0]));

        let eventID = await getEvent(sanitizer.sanitize("escape&eol",curr_row[2]));
        
        let data3 = {
            "hotelID":hotelID,
            "eventID":eventID
        };

        let opt3 = {
            method: 'POST',
            body: JSON.stringify(data3),
            headers: {'Content-Type': 'application/json'} 
        };

        let rDone = await fetch(url+"insert/reserves",opt3);
        alert("Insert Complete");

    };
}

async function getHotel(hotelName){
    let data2 = {
        "hotelName":hotelName
    }

    let opt2 = {
        method: 'POST',
        body: JSON.stringify(data2),
        headers: {'Content-Type': 'application/json'} 
    }

    let response = await fetch(url+"get/hotelID",opt2);
    let data = await response.json();
    let hotelID = data.ID;
    return hotelID;
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

    let response = await fetch(url+'get/eventID',options2);
    let data = await response.json();
    let eventID = data.ID;
    return eventID;
}


module.exports = {hotelFunc: hosthotelsCSV};

