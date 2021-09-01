const config = require("../util/config");
//sanitizer to prevent cross script attacks
//
const mysql = require("mysql");

const con = mysql.createConnection(config);
con.connect(function(err){
    if(err) throw err;
    console.log("Connected to database");
});

exports.hostHotels = (req,res) => {
    var hotelName = req.body.hotelName;
    var hhPostalCode = req.body.hhPostalCode;
    

    values = ["'"+hotelName+"'","'"+hhPostalCode+"'"];

    const sql = "INSERT INTO Host_Hotels (hotelName,hhPostalCode) VALUES ("+values+")";


    con.query(sql,values,function(err,result){
        if(err) throw err;
        console.log("Number of records inserted: "+ result.affectedRows);
    });

}

exports.reserves = (req,res) => {
    var hotelID = req.body.hotelID;
    var eventID = req.body.eventID;

    values = ["'"+hotelID+"'","'"+eventID+"'"];

    const sql = "INSERT INTO reserves (hotelID,eventID) VALUES ("+values+")";

    

    con.query(sql,values,function(err,result){
        if(err) throw err;
        console.log("Number of records inserted: "+ result.affectedRows);
    });
}

exports.getHotelID = (req,res) => {
    var hotelName = req.body.hotelName;

    const sql = "SELECT * FROM Host_Hotels WHERE hotelName ="+"'"+hotelName+"'"+" LIMIT 1";

    con.query(sql,function(err,result){
        if(err) throw err;
        res.send(200,{ID:result[0].hotelID});
    });
}