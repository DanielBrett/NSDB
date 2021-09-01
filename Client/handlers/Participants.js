const config = require("../util/config");
//sanitizer to prevent cross script attacks
//
const mysql = require("mysql");

const con = mysql.createConnection(config);
con.connect(function(err){
    if(err) throw err;
    console.log("Connected to database");
});
exports.participants = (req,res) => {
    var pPostCode = req.body.pPostCode;
    var teamSize = req.body.teamSize;
    var pCity = req.body.pCity;


    values = ["'"+pPostCode+"'","'"+teamSize+"'","'"+pCity+"'"];

    const sql = "INSERT INTO Participants (pPostCode,teamSize,pCity) VALUES ("+values+")";


    con.query(sql,values,function(err,result){
        if(err) throw err;
        console.log("Number of records inserted: "+ result.affectedRows);
        res.json({ID:"200"});
    });
}
     
exports.participateIn = (req,res) => {
    var particID = req.body.particID;
    var eventID = req.body.eventID;

    values = ["'"+particID+"'","'"+eventID+"'"];

    const sql = "INSERT INTO participateIn (particID,eventID) VALUES ("+values+")";

    con.query(sql,values,function(err,result){
        if(err) throw err;
        console.log("Number of records inserted: "+ result.affectedRows);
        res.json({ID:"200"});
    });
}

exports.getParticID = (req,res) => {
    var particID = req.body.particID;

    const sql = "SELECT * FROM Participants WHERE pPostCode ="+"'"+particID+"'"+" LIMIT 1";

    con.query(sql,function(err,result){
        if(err) throw err;
        res.send(200,{ID:result[0].particID});
    });
}