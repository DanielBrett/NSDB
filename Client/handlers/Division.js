const config = require("../util/config");
//sanitizer to prevent cross script attacks
//
const mysql = require("mysql");

const con = mysql.createConnection(config);

con.connect(function(err){
    if(err) throw err;
    console.log("Connected to database");
});
exports.division = (req,res) => {
    var divisionName = req.body.divisionName;

    console.log("Connected to database");

    values = ["'"+divisionName+"'"];
    const sql = "INSERT INTO Division (divisionName) VALUES ("+values+")";

    

    con.query(sql,values,function(err,result){
        if(err) throw err;
        console.log("Number of records inserted: "+ result.affectedRows);
        res.json({ID:"200"});
    });
}

exports.contains = (req,res) => {
    var divID = req.body.divID;
    var eventID = req.body.eventID;

    console.log("Connected to database");

    values = ["'"+divID+"'","'"+eventID+"'"];

    const sql = "INSERT INTO contains (divID,eventID) VALUES ("+values+")";

    con.query(sql,values,function(err,result){
        if(err) throw err;
        console.log("Number of records inserted: "+ result.affectedRows);
        res.json({ID:"200"});
    });
}

exports.getDivID= (req,res) =>{
    var divisionName = req.body.divisionName;

    const sql = "SELECT * FROM Division WHERE divisionName ="+"'"+divisionName+"'"+" LIMIT 1";
    con.query(sql,function(err,result){
        if(err) throw err;
        res.send(200,{ID:result[0].divID});
    });
}