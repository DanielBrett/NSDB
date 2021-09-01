const config = require("../util/config");
//sanitizer to prevent cross script attacks
//
const mysql = require("mysql");

const con = mysql.createConnection(config);

con.connect(function(err){
    if(err) throw err;
    console.log("Connected to database");
});
exports.Act = (req,res) => {
    var activityName = req.body.activityName;
   
    values = ["'"+activityName+"'"];
    const sql = "INSERT INTO Activities (activityName) VALUES ("+values+")";


    con.query(sql,values,function(err,result){
        if(err) throw err;
        console.log("Number of records inserted: "+ result.affectedRows);
    });
}

exports.getAct = (req,res) => {
    var activityName = req.body.activityName;
    console.log(activityName);
    const sql = "SELECT * FROM Activities WHERE activityName = "+"'"+activityName+"'"+" LIMIT 1";

    con.query(sql,function(err,result){
        if(err) throw err;
        try{
            res.json({ID:result[0].activityName});
        }catch(error){
            res.json({ID:"1"});
        }
    });
}
