const config = require("../util/config");
//sanitizer to prevent cross script attacks
//
const mysql = require("mysql");

const con = mysql.createConnection(config);

con.connect(function(err){
    if(err) throw err;
    console.log("Connected to database");
});
exports.facility = (req,res) => {
    var facilityName = req.body.facilityName;
    var ownerID = req.body.ownerID;
    var fTypeID = req.body.fTypeID;
    var streetNum = req.body.streetNum;
    var streetName = req.body.streetName;
    var fPostCode = req.body.fPostCode;
    // var facLatitude = req.body.facLatitude;
    // var facLongitude = req.body.facLongitude;

    values = ["'"+facilityName+"'","'"+ownerID+"'","'"+fTypeID+"'","'"+streetNum+"'","'"+streetName+"'","'"+fPostCode+"'"];

    const sql = "INSERT INTO Facility (facilityName,ownerID,fTypeID,streetNum,streetName,fPostCode) VALUES ("+values+")";


    con.query(sql,values,function(err,result){
        if(err) throw err;
        console.log("Number of records inserted: "+ result.affectedRows);
    });
}

exports.fHasFt = (req,res) => {
    var facID = req.body.facID;
    var fTypeID = req.body.fTypeID;
    var fhftUntil = req.body.fhftUntil;
    var fhftSince = req.bosy.fhftUntil;

    values = ["'"+facID+"'","'"+fTypeID+"'","'"+fhftUntil+"'","'"+fhftSince+"'"];

    const sql = "INSERT INTO fHasFt (facID,fTypeID,fhftUntil,fhftSince) VALUES ("+values+")";


    con.query(sql,values,function(err,result){
        if(err) throw err;
        console.log("Number of records inserted: "+ result.affectedRows);
    });
}

exports.oOwnsF = (req,res) => {
    var ownerID = req.body.ownerID;
    var facID = req.body.facID;
    var since = req.body.since;
    var until = req.bosy.until;
  

    values = ["'"+ownerID+"'","'"+facID+"'","'"+since+"'","'"+until+"'"];

    const sql = "INSERT INTO oOwnsF (ownerID,facID,since,until) VALUES ("+values+")";


    con.query(sql,values,function(err,result){
        if(err) throw err;
        console.log("Number of records inserted: "+ result.affectedRows);
    });
}

exports.getOwnID = (req,res) => {
    var ownerName = req.body.ownerName;

    const sql = "SELECT * FROM Ownership_Org WHERE ownerName ="+"'"+ownerName+"'"+" LIMIT 1";

    con.query(sql,function(err,result){
        if(err){
        }
        try{
            console.log(result[0].ownerID);
            res.json({ID:result[0].ownerID});
        }catch(error){
            res.json({ID:"1"}); 
        }
    });
}

exports.getFacTypeID = (req,res) =>{
    var facType = req.body.facType;
    
    const sql = "SELECT * FROM Fac_Types WHERE fType ="+"'"+facType+"'"+" LIMIT 1";
    con.query(sql,function(err,result){
        if(err) throw err;
        console.log(result[0].fTypeID);
        try{
            res.json({ID:result[0].fTypeID});
        }catch(error){
            
        }
    });
}

exports.getFacID= (req,res) =>{
    var facName = req.body.facName;

    const sql = "SELECT * FROM Facility WHERE facilityName ="+"'"+facName+"'"+" LIMIT 1";
    con.query(sql,function(err,result){
        if(err) throw err;
        res.send(200,{ID:result[0].facID});
    });
}