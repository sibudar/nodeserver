/*

Client Router

We handle all front-end http requests in this file 
and let client-controller to do all the 
validations and some other logics

*/

const express = require("express");
const ClientCtr = require("../controller/client-controller"); //controller
const router = express.Router();
const bcrypt = require("bcrypt");


/* 

clients login

required parameters(email,password)
returns: login status as string 

*/
router.post("/login", async function(req, res){
    
    var email =  req.body.email; // email parameter
    var password = req.body.password; //password parameter

    var result = await ClientCtr.Login(email,password); //passing values to the Controller

    res.send(result); //send back to the front-end
   
})



/* 

Insert clients

required parameters (firstname,lastname,organisation,password,active,adminID)
returns status as a string
*/
router.post("/add-clients",async function(req, res) {
        
    var firstname = req.body.firstname; //firstname : String
    var lastname = req.body.lastname; //lastname : string
    var organization = req.body.organization; //organisation : string
    var password = bcrypt.hashSync(req.body.password,10); //encrypted password : string
    var email = req.body.email; //email : string
    var active = req.body.active; // actvie : integer
    var adminID = req.body.adminID; //adminID : integer

    var result = await ClientCtr.addClient(firstname, lastname, organization, password,email, active, adminID);

    res.send(result);


 })

 
 //admin displaying all clients
router.get("/display-clients",async function(req, res)  {
    var result = await ClientCtr.displayClient(); //from client-controller
    res.send(result);
        
}) 


/* 

display single client

required parameter (id)
returns an array of objects
*/
router.get("/getSingle-client/:id",async function(req, res){
 
      var id = (req.params.id); //id : string
      var result = await ClientCtr.singleClient(id); //from client controller

    res.send(result[0]);

})
          
/*

delete clients

required parameters (id)
returns status as a string

*/
router.post("/delete-clients",async function(req, res){
      var id = req.body.id;
      var result = await ClientCtr.deleteClient(id);

      res.send(result[0]);
      
    })


/* 

activating clients

required parameter(id)
*/
router.post("/activate-clients", async function(req, res){
      var id = req.body.id;

      var result = await ClientCtr.ActivateClient(id);

    res.send(result[0]);
  
  }) 
  

/* 

update clients
required parameters (id, lastname,organisation,email)
returns a status as a string
*/
router.post("/update-clients",async function(req, res){
  var id = req.body.id; //id : integer
  var firstname = req.body.firstname; //firstname : string
    var lastname = req.body.lastname;//lastname : string
    var organization = req.body.organization; //organization : string
    var email = req.body.email; //email : string

    var result = await ClientCtr.updateClient(id,firstname, lastname, organization, email);

    res.send(result[0]);
    
})


module.exports=router;
      