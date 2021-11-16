(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.eventsBundle = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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


async function eventsCSV(){
    var fileInput = document.getElementById("csv"),

    
    reader = new FileReader();
    reader.onload = function () {
        let data = reader.result;
        console.log(data);
        events(data.toLowerCase());
    };
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput.files[0]);
}


async function events(data){

    
    const rows = data.split('\n').slice(1);
    for(let i = 0; i < rows.length;i++){
        if(rows[i].length < 1){
            continue;
        }
        const curr_row = rows[i].split(',');
    
        console.log(curr_row);
    
        
        let fin_data = {
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
        let returned = await fetch(url+'insert/events',options);

        let eventID = await getEvent(sanitizer.sanitize("escape",curr_row[0]));

        let ownerID = await getOwn(sanitizer.sanitize("escape",curr_row[12]));

        var data4 = {
            "eventID":eventID,
            "ownerID":ownerID
        }
        const opt4 = {
            method: 'POST',
            body: JSON.stringify(data4),
            headers: {'Content-Type': 'application/json'}
        }

        let hdone = await fetch(url+'insert/hostedBy',opt4);

        let facID = await getFac(sanitizer.sanitize("escape&eol",curr_row[13]));
        eventID = await getEvent(sanitizer.sanitize("escape",curr_row[0]));
    
        var data6 ={
            "facID":facID,
            "eventID":eventID
        }
        console.log(data6);
        const opt6 = {
            method: 'POST',
            body: JSON.stringify(data6),
            headers: {'Content-Type': 'application/json'}
        }
        let haDone = await fetch(url+'insert/heldAt',opt6);
        alert("Insert Complete");
    };
}

async function getEvent(eventName){
    var data2 = {
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
    let ownerID = data.ID;
    return ownerID;
}

async function getFac(facName){

    console.log(facName);
    let data5 = {
        "facName" : facName
    }

    let opt5 = {
        method: 'POST',
        body: JSON.stringify(data5),
        headers: {'Content-Type': 'application/json'}
    }
    let response = await fetch(url+'get/facID',opt5);
    let data = await response.json();
    let facID = data.ID;
    return facID;
}


module.exports = {eventsFunc: eventsCSV};
},{"../Client/util/hostConfig.js":1,"../Client/util/sanitizer.js":2}]},{},[3])(3)
});

