async function fac_typeCSV(){
    var fileInput = document.getElementById("csv"),

    
    reader = new FileReader();
    reader.onload = function () {
        data = reader.result;
        console.log(data);
        fac_type(data.toLowerCase());
    };
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput.files[0]);
}


async function fac_type(data){

    const host = require("../Client/util/hostConfig.js");
    const url = host.getHostURL();
    const sanitizer = require("../Client/util/sanitizer.js");
    const rows = data.split('\n').slice(1);
    console.log(rows[3]);
    for(i = 0; i < rows.length;i++){
        if(rows[i].length < 1){
            continue;
        }
        const curr_row = rows[i].split(',');
    
        console.log(curr_row);
        
        var activityName = sanitizer.sanitize("escape",curr_row[1]);
        console.log(activityName);
        ended = await insertActivity(activityName);

        fin_data = {
            "fType": sanitizer.sanitize("escape",curr_row[0]),
            "indoorOutdoor": curr_row[2],
            "ActivityName": sanitizer.sanitize("escape",curr_row[1]),
            "length": curr_row[3],
            "width": curr_row[4],
            "height": sanitizer.sanitize("eol",curr_row[5])
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(fin_data),
            headers: {'Content-Type': 'application/json'}
        }
        
        console.log(options);
        fetch(url+'insert/fac_Type',options);
        alert("Insert Complete");
    };
}

async function insertActivity(activityName){
    const data = {
        "activityName": activityName
    }
    const opt={
        method:'POST',
        body:JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    }

    let response = await fetch(url+'get/activity',opt);
    let data4 = await response.json();

    console.log("fetch returned");

    if(data4.ID == "1"){
        const data1={
            "activityName":activityName
        };
        const opt1 ={
            method:'POST',
            body:JSON.stringify(data1),
            headers: {'Content-Type': 'application/json'}
        };

        fetch(url+'insert/activities',opt1)
    }
    ended = true;
    return ended;
}

