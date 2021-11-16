(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.hostHotelsBundle = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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


},{"../Client/util/hostConfig.js":1,"../Client/util/sanitizer.js":2}]},{},[3])(3)
});

