const config = require("../util/config");
//sanitizer to prevent cross script attacks
//
const mysql = require("mysql");

const con = mysql.createConnection(config);
con.connect(function(err){
    if(err) throw err;
    console.log("Connected to database");
});

exports.events = (req,res) => {
    var contactName = req.body.contactName;
    var contactEmail = req.body.contactEmail;
    var contactPhone = req.body.contactPhone;
    var nameOfEvent = req.body.nameOfEvent;
    var regCost= req.body.regCost;
    var eoYear = req.body.eoYear;
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    var eCity = req.body.eCity;
    var frequency = req.body.frequency;
    var maleFemaleBoth = req.body.maleFemaleBoth;
    var childAdultBoth = req.body.childAdultBoth;
  

    values = ["'"+contactName+"'","'"+contactEmail+"'","'"+contactPhone+"'","'"+nameOfEvent+"'","'"+regCost+"'","'"+eoYear+"'","'"+startDate+"'","'"+endDate+"'","'"+eCity+"'","'"+frequency+"'","'"+maleFemaleBoth+"'","'"+childAdultBoth+"'"];

    const sql = "INSERT INTO Events (contactName,contactEmail,contactPhone,nameOfEvent,regCost,eoYear,startDate,endDate,eCity,frequency,maleFemaleBoth,childAdultBoth) VALUES ("+values+")";


    con.query(sql,values,function(err,result){
        if(err) throw err;
        console.log("Number of records inserted: "+ result.affectedRows);
        res.json({ID:"200"});
    });
}

exports.builtOf = (req,res) => {
    var activityName = req.body.activityName;
    var eventID = req.body.eventID;
    

    values = ["'"+activityName+"'","'"+eventID+"'"];

    const sql = "INSERT INTO builtOf (activityName,eventID) VALUES ("+values+")";

    con.query(sql,values,function(err,result){
        if(err) throw err;
        console.log("Number of records inserted: "+ result.affectedRows);
    });
}

exports.heldAt = (req,res) => {
    var facID = req.body.facID;
    var eventID = req.body.eventID;
    

    values = ["'"+facID+"'","'"+eventID+"'"];

    const sql = "INSERT INTO heldAt (facID,eventID) VALUES ("+values+")";

    con.query(sql,values,function(err,result){
        if(err) throw err;
        console.log("Number of records inserted: "+ result.affectedRows);
        res.json({ID:"200"});
    });
}

exports.hostedBy = (req,res) => {
    var eventID = req.body.eventID;
    var ownerID = req.body.ownerID;
    
  

    values = ["'"+eventID+"'","'"+ownerID+"'"];

    const sql = "INSERT INTO hostedBy (eventID,ownerID) VALUES ("+values+")";

    con.query(sql,values,function(err,result){
        if(err) throw err;
        console.log("Number of records inserted: "+ result.affectedRows);
        res.json({ID:"200"});
    });
}

exports.getEventID = (req,res) =>{
    var eventName = req.body.eventName;

    const sql = "SELECT * FROM Events WHERE nameOfEvent ="+"'"+eventName+"'"+" LIMIT 1";
    con.query(sql,function(err,result){
        if(err) throw err;
        res.send(200,{ID:result[0].eventID});
    });
}

