const config = require("../util/config.js");

const mysql = require("mysql");
const con = mysql.createConnection(config);

con.connect(function(err){
    if(err) throw err;
    console.log("Connected to database");
});

exports.fac_types = (req,res) => {
    console.log(req.body);
    var fType = req.body.fType;
    var indoorOutdoor= req.body.indoorOutdoor;
    var ActivityName = req.body.ActivityName;
    var length = req.body.length;
    var width = req.body.width;
    var height = req.body.height;

    values = ["'"+fType+"'","'"+indoorOutdoor+"'","'"+ActivityName+"'","'"+length+"'","'"+width+"'","'"+height+"'"];

    const sql = "INSERT INTO Fac_Types (fType,indoorOutdoor,ActivityName,length,width,height) VALUES ("+values+")";


    con.query(sql,values,function(err,result){
        if(err) throw err;
        console.log("Number of records inserted: "+ result.affectedRows);
    });
}

exports.accomodate = (req,res) => {
    var Activities = req.body.Activities;
    var fTypeID = req.body.OwnerName;

    con.connect(function(err){
        if(err) throw err;

        console.log("Connected to database");

        values = ["'"+Activities+"'","'"+fTypeID+"'"];

        const sql = "INSERT INTO accomodate (Activities,fTypeID) VALUES ("+values+")";

        con.query(sql,values,function(err,result){
            if(err) throw err;
            console.log("Number of records inserted: "+ result.affectedRows);
        });
    });
}
