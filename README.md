Running this program on reclaim cloud:

After logging into reclaim cloud, we have two nodes having ID 8963 and 8976.


Node 8963:
This is the backend of our program.
Click on web ssh for this node and then "cd ROOT/Client"
now do ```node server.js```


Node 8976:
This is the front end of out program
Click on web ssh for this node and then "cd ROOT/Parsers"
now do ```node app.js```


Moreover, we can use the forever module of npm to let the program running even after we close the tab.
To make this possible, first install the package by doing
```
[sudo] npm install forever -g
```
Now instaead of doing "node server.js" and "node app.js", you need to do
```forever start server.js``` and ```forever start app.js``` (be careful that you need to be in the correct folder to run each command)





----- support for an older version of this software, there still might be usefull stuf inside it -----------

Within the Utility Folder there is a config file into which you will insert the Database host location and authentication details

The Functions for each route are within the handler's folders. Each routing starts off with exports.functionname(req,res) => {}. 
Exporting allows us to call the function in the main server file that will handle the routing.

Once you have created the new modular function in the handler's folder, proceed to server.js and import your function by adding:
```
const functionname = require("/handlers/functionname");
```
Now add the routing Line:
```
app.post("/insert/functionname",functionname);
```

# Folder Structure

1. Client
   > will hold all necessaru scripts to run the server, within it their is the server file and inside of Handlers are where you will create a new file for any function you wish to export to the server
   > There is a util folder within Client where the information about the database connection is held and used across the application, if you wish to change the connection details do so here
2. Parsers
   > Within the parsers folder is where you will add or change any new JS scripts that are responsible for taking in the CSV from the interface and breaking down data and sending them to the server

# Server Packages Used

1. Express JS
   > A Node JS package which simplifies the process of building web applications and API's by setting a simple format for routing functions
2. CORS
   > Node JS package which provides a Connect/Express middleware to enable CORS with various options. CORS is cross origin sharing and allows restricted resources on a web page to be requested from a domain outside of its own. 
   
# Sanitization of inputs
1. Within the Utility folder their is a saniter.js file that has a function import it with
   >const sanitizer = require("../Client/util/sanitizer.js");
2. Call it with an option and the string to be sanitized and it will return a new string
   >sanitizer.sanitize("option",string);
3. the current options are
   > 1. escape \- which escapes any necessary values
   > 2. removespace \- which removes any spaces
   > 3. escape&eol \- which escapes values and removes carriage returns
   > 4. dashes \- which removes dashes
   > 5. eol \- which removes carriage returns
4. to add new options within the sanitizer.js file add a new case statement within the switch and return a string
   > case "new option": return string;
   
# Add the following Code to be able to connect to the database within the server functions in the Handler folder
```
const config = require("../util/config.js");

const mysql = require("mysql");
const con = mysql.createConnection(config);

con.connect(function(err){
    if(err) throw err;
    console.log("Connected to database");
});
```
   
# How To Insert Data into the Database from server Handler Files

1. Within the normally formatted function, you have access to a req object which will hold any information sent alongside the server request. To access variables that should have been passed with the request type **req.body.variablename** 
2. Now you need to create a values variable and add make them a list in the proper order they are going to inserted in the table. They need to be surrounded by single quotes within double quotes for proper formatting
```
var values = ["'"+variable1+"'","'"+variable2+"'"]
```
3. Create a variable to hold the SQL query string 
```
var sql = "INSERT INTO tablename (variable1,variable2) VALUES ("+values+")";
```
4. open a connection with the database and pass in your query and values
```
con.query(sql,values,function(err,result){
   if(err) throw err;
   console.log("Number of records inserted: "+ result.affectedRows);
});
```
# How to get data from the Database from server Handler Files

1. Within the normally formatted function you have access to a req object which will hold any information send alongside the server request. To access variables that should have been passed with the request type **req.body.variablename**. Use the variable as the key search for the data 
2. Create the SQL query string to select the necessary table row that will contain the data. This can be adjusted for any SQL query
```
const sql = "SELECT * FROM tablename WHERE keyvariable ="+"'"+keyvariable+"'"+" LIMIT 1";
```
3. Open a connection with the database and pass in the query and access the result object to access any needed values with a catch statement in case the data is not available
```
con.query(sql,function(err,result){
   try{
      res.json({ID:result[0].columnneeded});
   }catch(error){
   }
});
```
# Basic Format for creating new Parser file

> Any work required to be done on each row is to be done within the for loop
```
async function functionameCSV(){
    var fileInput = document.getElementById("csv"),

    
    reader = new FileReader();
    reader.onload = function () {
        data = reader.result;
        console.log(data);
        functionname(data.toLowerCase());
    };
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput.files[0]);
}

async function functionname(data){
    console.log(data);
    const host = require("../Client/util/hostConfig.js");
    const url = host.getHostURL();
    const rows = data.split('\n').slice(1);

    for(i = 0; i < rows.length;i++){
      const curr_row = rows[i].split(',');
    };
}
```
- Within the for loop function the curr_row is the currently split csv row that is now acting as an array of values which you can access. Remember the first value in the row is curr\_row\[0\]. 

# Make a server request to insert data 

- First create a data object to hold variables that will be inserted
```
data = {
   "variable1": value,
   "variable2": value2
}
```
- Next create an options object to hold the request options and headers
```
options = {
   method:'POST',
   body:JSON.stringify(data),
   headers: {'Content-Type': 'application/json'}
}
```
- Make the fetch request with fetch(url+'insert/pathname',options);

# Make a server request to receive data 
- First create a data object to hold variables that will act as the key for the search in your getdata function
```
data = {
   "variable1": value
}
```
- Next create an options object to hold the request options and headers
```
options = {
   method:'POST',
   body:JSON.stringify(data),
   headers: {'Content-Type': 'application/json'}
}
```
- Now make the fetch request which will give you a data object within it to do whatever you need with the received data. You can access received variables with data.variablename
```
fetch(url+'get/ownID',opt).then(res => res.json()).then(data => {do stuff here}
```
# Change Host Data
- Within the Util folder there is a hostConfig file where you can change the host url and port 
- Keep all back slashes and colans there since they act as escape values and strucutre to create a URL used across files

# Change Debug State
- Within the Util Folder there is a degugconfig file where you can change the value to True if you wish for console.logs to run on the application
- Within the HTML there is a script block where it disables console.logs if debug is set to false via
   >
   ```
   deb = require("../Client/util/debugConfig");
    DEBUG = deb.DEBUG;

    if(DEBUG == false){
      console.log = function () {};
    }
    ```
# Interface
1. The interface is using HTML and including Bootstrap CSS and JS scripts with the following script tags
   > \<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous"> and \<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
   
2. Once you have a new parser created add it to the interface HTML using a script tag
   > \<script src="parsername.js"></script\>
3. Now create a new Button to represent it with an onclick event which will call the initial CSV reader function of the parser
   > \<button type="button" class="btn btn-outline-primary"onclick="parsernameCSV()">parsername</button\>
   
# Next Steps
- Enable Node.js server functionailty to keep running through mysql errors because currently the server will shut down if mysql returns an error
- Add specific naming of CSV's required and have each parser check that the correct CSV is being used
- Progression bar and feedback to user via Interface while data is being inserted 
   > please see https://getbootstrap.com/docs/5.0/components/progress/
- Prettify Interface if wanted
# NSDB
