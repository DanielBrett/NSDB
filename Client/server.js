
//express node.js app routing library
const app = require("express")();
const cors = require('cors');
const express = require("express");
app.use(express.json({
    type: ['application/json', 'text/plain']
  }));
app.use(cors({
	origin:"https://env-0185007.us.reclaim.cloud",

}));




//Importing routes
const {
    Own
 } = require("./handlers/Owner");
const {
    Act,
    getAct
} = require("./handlers/Activities");
const {
    fac_types,
    accommodate
} = require("./handlers/Fac_Types");
 const {
    facility,
    getOwnID,
    getFacTypeID,
    getFacID,
//     fHasFt,
//     oOwnsF
} = require("./handlers/Facility");
const {
    events,
    getEventID,
    builtOf,
    heldAt,
    hostedBy
} = require("./handlers/Events");
const {
    division,
    contains,
    getDivID
} = require("./handlers/Division");
const{
    participants,
    getParticID,
    participateIn
} = require("./handlers/Participants");
const {
    hostHotels,
    reserves,
    getHotelID 
} = require("./handlers/Host_Hotels");

//initializing the routes on the server and their paths

// //owner routes
app.post("/insert/owner",Own);

// //activities routes

app.post("/insert/activities",Act);
app.post("/get/activity",getAct);

//facility type routes
app.post("/insert/fac_Type",fac_types);
app.post("/get/ownID",getOwnID);
app.post("/get/facTypeID",getFacTypeID);


//facility routes
 app.post("/insert/facility",facility);
 app.post("/get/facID",getFacID);


// //event routes
app.post("/insert/events",events);
app.post("/insert/builtOf",builtOf);
app.post("/insert/heldAt",heldAt);
app.post("/insert/hostedBy",hostedBy);
app.post("/get/eventID",getEventID);

// //division routes
app.post("/insert/division",division);
app.post("/insert/contains",contains);
app.post('/get/divID',getDivID);

// //participant routes
app.post("/insert/participants",participants);
app.post("/get/particID",getParticID);
app.post("/insert/participateIn",participateIn);

//Hotel routes
app.post("/insert/hostHotels",hostHotels);
app.post("/insert/reserves",reserves);
app.post("/get/hotelID",getHotelID );

app.get('/myapp/', function(req, res){
    res.send("Hello from the root application URL");
});

//once server is initialized it is set to port 4848 and we will get a console log if successful
app.listen(4848); 
console.log("NSDB Server Online")









