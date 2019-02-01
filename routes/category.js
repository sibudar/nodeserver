const express = require('express');
const connection = require('../connectionDB/mysql');
const router = express.Router();
const mysql = require('mysql');

//add categories

router.post('/add-category',(req, res) => {
    var categoryName = req.body.categoryName;
    var sql = "INSERT INTO category (categoryName) VALUES ?";
   
    connection.query(sql, [[[categoryName]]],function(err, result){
        if (err) throw err;
        console.log("1 record inserted");
    res.send({res:"added"})

    })
    
    
    })

    //displaying categories


router.get('/display-category',(req, res) => {
   
   connection.query("SELECT * FROM category",function (err, result, fields){
if (err) throw err;
console.log(result); 
res.send(result)



   })


   }) 
    module.exports=router;