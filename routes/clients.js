const express = require('express');
const connection = require('../connectionDB/mysql');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');

//console.log("uclient uya runner")

  router.get('/nonny', (req, res, next) =>{
    res.status(200).json({
        message :'added nonny'
    })
  });

router.post('/login', function (req, res){
    // console.log("req")
    var email =  req.body.email;
    var password = req.body.password;

   var sql = "SELECT * FROM clients WHERE email="+mysql.escape(email); 
    connection.query(sql,async (err, dbvalues, field)=> {
      if (err) throw err
      if(dbvalues.length>0){
          
          //console.log("You are logged in")
          //res.json(rows[0])
  var match = await bcrypt.compare(password, dbvalues[0].password); //check if password matches
    match ? res.send("You are logged in") : res.send("username or password is wrong")
     }else{
          res.send("email doesn't exist")//wrong login details
     }
  })
    //res.json(req.body)
   
      })

      //Insert clients
      router.post('/add-clients', function (req, res) {
        
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var organization = req.body.organization;
    var password = bcrypt.hashSync(req.body.password,10);
    var email = req.body.email;
    var active = req.body.active;
    var adminID = req.body.adminID;
    
    var fields = [[ firstname, lastname, organization, password,email, active, adminID]];
   //var sql = "INSERT INTO clients (firstname,lastname,organization,password, email, active, adminID)VALUES ?";
   var sql = `CALL sp_addClients('${firstname}','${lastname}','${organization}','${password}','${email}','${active}','${adminID}')`;
    connection.query(sql,[fields],function(err, results) {
      if (err) throw err
      if(results){
          
          console.log("data added!")
         res.json("data added!")
      }else{
          res.send("error")
      }

  })

 })

      //admin displaying all clients

      router.get('/display-clients',(req, res) => {
        connection.query("CALL sp_displayClients" ,function (err, result, fields){
          if (err) throw err;
          console.log(result); 
          res.send(result[0])
            
             })
          
             }) 

             
   //delete clients
    router.post('/delete-clients', function(req, res){
      var id = req.body.id;
      var sql = `CALL sp_DeleteClients(${id})`;
      connection.query(sql, function(err, results){
        if (err) throw err
        res.send('client deleted');

      })

    })
//update clients
router.post('/update-clients', function(req, res){
  var id = req.body.id;
  var firstname = req.body.firstname;
    var lastname = req.body.Lastname;
    var organization = req.body.organization;
    var password = bcrypt.hashSync(req.body.password,10);
    var email = req.body.email;
    var active = req.body.active;
    var adminID = req.body.adminID;
  //var sql = "UPDATE clients SET firstname='"+firstname+"',lastname='"+lastname+"',organization='"+organization+"',password='"+password+"',email='"+email+"',active="+active +" WHERE id="+mysql.escape(id);
  var sql = `CALL sp_updateClients ('${firstname = firstname}','${lastname = lastname}','${organization}','${password}','${email}','${active}','${adminID}')`;
connection.query(sql, function(err, results){
  if (err) throw err;
  res.send('client updated');
})
// res.json({
//   mysql: sql
// });

})




      module.exports=router;
      