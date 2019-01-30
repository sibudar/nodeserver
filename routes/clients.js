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

      module.exports=router;
      