// Import the Express module
var express = require('express')

//  Create a new Express Instance
var app = express();

// incoming Request Object as a JSON Object 
app.use(express.json());
var passwordHash = require('password-hash');

var jwt = require('jsonwebtoken');

var LoanJS = require('loanjs');



app.use('/',login=express.Router());
require('./Route/login_system')(login,passwordHash,jwt);

app.use('/',view=express.Router())
require('./Route/agent_admin')(view,jwt,LoanJS)
  





app.listen(8000,()=>{
    console.log(`Server is listening on port: ${8000}`);
})

