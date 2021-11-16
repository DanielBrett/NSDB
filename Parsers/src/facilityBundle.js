(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.facilityBundle = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = {
    host:"https://node8963-env-0185007.us.reclaim.cloud/",
    getHostURL: function(){
        return this.host
    }
}
},{}],2:[function(require,module,exports){
module.exports = {
    sanitize: function(option,string){
        switch(option){
            case "escape":
                return string.replace(/[\"']/g, '\$&').replace(/\u0000/g, '\\0') ;
            case "removespace":
                return string.replace(/\s+/g, '');
            case "escape&eol":
                return string.replace("\r","").replace(/[\"']/g, '\$&').replace(/\u0000/g, '\\0') ;
            case "dashes":
                return string.replace(/-/g, "");
            case "eol":
                return string.replace("\r","");
        }
    }
}
},{}],3:[function(require,module,exports){
const host = require("../Client/util/hostConfig.js");
const url = host.getHostURL();
const sanitizer = require("../Client/util/sanitizer.js");


async function facilityCSV(){
    var fileInput = document.getElementById("csv"),

    
    reader = new FileReader();
    reader.onload = function () {
        var data = reader.result;
        console.log(data);
        console.log(" inside facilitycsv");

        facility(data.toLowerCase());
    };
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput.files[0]);
}


async function facility(data){

    
    const rows = data.split('\n').slice(1);
    for(let i = 0; i < rows.length;i++){
        if(rows[i].length < 1){
            continue;
        }
        let ownerID = "";
        let fTypeID = "";
        const curr_row = rows[i].split(',');
    
        console.log(curr_row);
        var ownName = sanitizer.sanitize("escape",curr_row[1]);
        ownerID = await getOwnID(ownName,curr_row);
        
        var facType = sanitizer.sanitize("escape",curr_row[5]);
        fTypeID = await getFacID(facType);
        
        console.log(fTypeID);
        let pcode = curr_row[11].replace("\r","");
        let fin_data = {
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
    let datas = {
        "ownerName": ownername
    }
    let opt={
        method:'POST',
        body:JSON.stringify(datas),
        // mode:'no-cors',
        headers: {'Content-Type': 'application/json'}
    }

    let response = await fetch(url+'get/ownID',opt);
    let data = await response.json();

    if(data.ID == "1"){
        console.log("this ran");
        let data2 = {
            "OwnerName":ownername,
            "oType": sanitizer.sanitize("escape",curr_row[2])
        }
        let opt2 ={
            method:'POST',
            body:JSON.stringify(data2),
            // mode:'no-cors',
            headers: {'Content-Type': 'application/json'}
        }
        let res = await fetch(url+'insert/owner',opt2);
        let da = await res.json(); 

        let data3 = {
            "ownerName": sanitizer.sanitize("escape",curr_row[1])
        }
        let opt3 = {
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
        let ownerID = data.ID;
        console.log(ownerID);
        return ownerID;
    }
}

async function getFacID(facType)
{
    console.log(facType);
    let data1 = {
        "facType": facType
    };

    let opt1 ={
        method:'POST',
        body:JSON.stringify(data1),
        // mode:'no-cors',
        headers: {'Content-Type': 'application/json'}
    }

    let response = await fetch(url+'get/facTypeID',opt1);
    let data = await response.json();
    let fTypeID = data.ID;
    console.log(fTypeID);
    return fTypeID;
}

module.exports = {facilityFunc: facilityCSV};


},{"../Client/util/hostConfig.js":1,"../Client/util/sanitizer.js":2}]},{},[3])(3)
});

