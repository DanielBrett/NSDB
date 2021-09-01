const config = require("../util/config");

const mysql = require("mysql");

const con = mysql.createConnection(config);
con.connect(function(err){
    if(err) throw err;
    console.log("Connected to database");
});

exports.Own = (req,res) => {
    var otype = req.body.oType;
    var oName = req.body.OwnerName;

    values = ["'"+otype+"'","'"+oName+"'"];
    const sql = "INSERT INTO Ownership_Org (oType,OwnerName) VALUES ("+values+")";


    con.query(sql,values,function(err,result){
        if(err) throw err;
        console.log("Number of records inserted: "+ result.affectedRows);
        res.json({ID:'200'});
    });
}

