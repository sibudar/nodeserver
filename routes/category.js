const express = require('express');
const router = express.Router();
const CategoryCtr = require('../controller/category-controller');


//add categories

router.post('/add-category',async function(req, res) {
    var name = req.body.name;
    var active = req.body.active;
    
    var sql = "INSERT INTO category (name) VALUES ?";
   
    connection.query(sql, [[[name]]],function(err, result){
        if (err) throw err;
        console.log("1 record inserted");
    res.send({res:"added"})

    })
    
    
    })

    //displaying categories

router.get('/display-category',async function(req, res) {

     var result = await CategoryCtr.displayCategory();
 
     res.send(result[0]);

   })


   //delete category
    
   router.post('/delete-category',async function(req, res){

       var id = req.body.id;
       var result = await CategoryCtr.deleteCategory(id);

       res.send(result[0]);
       
    })

    //updating category

    router.post('/update-category',async function(req, res){

        var id = req.body.id;
        var name = req.body.name;
        var active = req.body.active;

        var result = await CategoryCtr.updateCategory(id, name, active);
 
        res.send(result[0]);
        
     })


    module.exports=router;