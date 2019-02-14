const express = require('express');
const connection = require('../connectionDB/mysql');
const router = express.Router();
const mysql = require('mysql');

console.log("uclient uya runner")
//router.get('/', (req, res, next) =>{
    //res.status(200).json({
        //message :'Get all applications'
    //})
  //});

  router.get('/nonny', (req, res, next) =>{
    res.status(200).json({
        message :'added nonny'
    })
  });

router.post('/login', function (req, res){
    // console.log("req")
    var username =  req.body.username;
    var password = req.body.password;
   var sql = "SELECT * FROM client WHERE password="+mysql.escape(password)+" AND username="+mysql.escape(username); 
    connection.query(sql, function(err, rows, field) {
      if (err) throw err
      if(rows.length>0){
          
          console.log("You are logged in")
          res.json(rows[0])
     }else{
          res.send("Wrong Loggin details")
     }
  })
    //res.json(req.body)
   
      })

      //Insert clients
      router.post('/add-clients', function (req, res) {
        
    var firstname = req.body.firstname;
    var Lastname = req.body.Lastname;
    var Organization = req.body.Organization;
    var password = req.body.password;
    var email = req.body.email;
    var active = req.body.active;
    var adminID = req.body.adminID;
    
    var fields = [[ firstname, Lastname, Organization, password,email, active, adminID]];
   var sql = "INSERT INTO clients (firstname,Lastname,Organization,password, email, active, adminID)VALUES ?";
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
        connection.query("SELECT * FROM clients WHERE active=1",function (err, result, fields){
          if (err) throw err;
          console.log(result); 
          res.send(result)
            
             })
          
             }) 
   //delete clients
    router.post('/delete-clients', function(req, res){
      var clientID = req.body.clientID;
      var sql = "UPDATE clients SET active=0 WHERE clientID="+mysql.escape(clientID);
      connection.query(sql, function(err, results){
        if (err) throw err
        res.send('client deleted');

      })

    })
//update clients
router.post('/update-clients', function(req, res){
  var clientID = req.body.clientID;
  var firstname = req.body.firstname;
    var Lastname = req.body.Lastname;
    var Organization = req.body.Organization;
    var password = req.body.password;
    var email = req.body.email;
    var active = req.body.active;
    var adminID = req.body.adminID;
  //var sql = 'UPDATE clients SET firstname="+firstname+",Lastname="+Lastname+",Organization="+Organization+",password="+password+", email="+email+", active=active, adminID=adminID WHERE clientID='+mysql.escape(clientID);
  var sql = "UPDATE clients SET firstname='"+firstname+"',Lastname='"+Lastname+"',Organization='"+Organization+"',password='"+password+"',email='"+email+"',active="+active +" WHERE clientID="+mysql.escape(clientID);
connection.query(sql, function(err, results){
  if (err) throw err;
  res.send('client updated');
})
// res.json({
//   mysql: sql
// });

})




      module.exports=router;
      