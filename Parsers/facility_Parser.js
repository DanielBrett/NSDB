async function facilityCSV(){
    var fileInput = document.getElementById("csv"),

    
    reader = new FileReader();
    reader.onload = function () {
        data = reader.result;
        console.log(data);
        facility(data.toLowerCase());
    };
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput.files[0]);
}


async function facility(data){

    const host = require("../Client/util/hostConfig.js");
    const url = host.getHostURL();
    const sanitizer = require("../Client/util/sanitizer.js");
    const rows = data.split('\n').slice(1);
    for(i = 0; i < rows.length;i++){
        if(rows[i].length < 1){
            continue;
        }
        let ownerID = "";
        let fTypeID = "";
        const curr_row = rows[i].split(',');
    
        console.log(curr_row);
        ownName = sanitizer.sanitize("escape",curr_row[1]);
        ownerID = await getOwnID(ownName,curr_row);
        
        facType = sanitizer.sanitize("escape",curr_row[5]);
        fTypeID = await getFacID(facType);
        
        console.log(fTypeID);
        pcode = curr_row[11].replace("\r","");
        fin_data = {
            "facilityName": sanitizer.sanitize("escape",curr_row[0]),
            "streetNum": curr_row[9],
            "streetName": sanitizer.sanitize("escape",curr_row[10]),
            "fPostCode": sanitizer.sanitize("removespace",pcode),
            "ownerID":ownerID,
            "fTypeID":fTypeID

        };
        const options = {
            method: 'POST',
            body: JSON.stringify(fin_data),
            // mode:'no-cors',
            headers: {'Content-Type': 'application/json'}
        }
        
        fetch(url+'insert/facility',options);
        alert("Insert Complete");
    };
}



async function getOwnID(ownername,curr_row)
{
    datas = {
        "ownerName": ownername
    }
    opt={
        method:'POST',
        body:JSON.stringify(datas),
        // mode:'no-cors',
        headers: {'Content-Type': 'application/json'}
    }

    let response = await fetch(url+'get/ownID',opt);
    let data = await response.json();

    if(data.ID == "1"){
        console.log("this ran");
        data2 = {
            "OwnerName":ownername,
            "oType": sanitizer.sanitize("escape",curr_row[2])
        }
        opt2 ={
            method:'POST',
            body:JSON.stringify(data2),
            // mode:'no-cors',
            headers: {'Content-Type': 'application/json'}
        }
        let res = await fetch(url+'insert/owner',opt2);
        let da = await res.json(); 

        data3 = {
            "ownerName": sanitizer.sanitize("escape",curr_row[1])
        }
        opt3 = {
            method:'POST',
            body:JSON.stringify(data3),
            // mode:'no-cors',
            headers: {'Content-Type': 'application/json'}
        }

        
        let response1 = await fetch(url+'get/ownID',opt3);
        let data1 = await response1.json()
        ownerID = data1.ID
        console.log(ownerID);
        return ownerID;
    }else{
        ownerID = data.ID;
        console.log(ownerID);
        return ownerID;
    }
}

async function getFacID(facType)
{
    console.log(facType);
    data1 = {
        "facType": facType
    };

    opt1 ={
        method:'POST',
        body:JSON.stringify(data1),
        // mode:'no-cors',
        headers: {'Content-Type': 'application/json'}
    }

    let response = await fetch(url+'get/facTypeID',opt1);
    let data = await response.json();
    fTypeID = data.ID;
    console.log(fTypeID);
    return fTypeID;
}


