(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.facTypeBundle = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
const sanitizer = require("../Client/util/sanitizer.js");
const url = host.getHostURL();

async function fac_typeCSV(){
    var fileInput = document.getElementById("csv"),

    
    reader = new FileReader();
    reader.onload = function () {
       let  data = reader.result;
        console.log(data);
        fac_type(data.toLowerCase());
    };
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput.files[0]);
}


async function fac_type(data){

    const rows = data.split('\n').slice(1);
    console.log(rows[3]);
    for(let i = 0; i < rows.length;i++){
        if(rows[i].length < 1){
            continue;
        }
        const curr_row = rows[i].split(',');
    
        console.log(curr_row);
        
        var activityName = sanitizer.sanitize("escape",curr_row[1]);
        console.log(activityName);
        let ended = await insertActivity(activityName);

        var fin_data = {
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
      //mode: 'no-cors',
        method:'POST',
        body:JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    }

    let response = await fetch(url+'get/activity',opt);
  //console.log("this is the response"+response.json());
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
    let ended = true;
    return ended;
}


module.exports = {myFunc: fac_typeCSV};


},{"../Client/util/hostConfig.js":1,"../Client/util/sanitizer.js":2}]},{},[3])(3)
});











