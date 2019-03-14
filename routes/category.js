/*

category router

we handle all front-end http requests in this file
*/

const express = require("express");
const router = express.Router();
const CategoryCtr = require("../controller/category-controller");


//add categories

router.post("/add-category",async function(req, res) {
    var name = req.body.name;
    var active = req.body.active;

    var result = await CategoryCtr.addCategory(name, active);

    res.status(result.status).send(result); //send back to the front-end
    
    })

    //displaying categories

router.get("/display-category",async function(req, res) {

     var result = await CategoryCtr.displayCategory();
 
     res.status(result.status).send(result);

   })


   /*
   delete category

   required parameter id
   */
    
   router.post("/delete-category",async function(req, res){

       var id = req.body.id;//id: string
       var result = await CategoryCtr.deleteCategory(id);//from category controller

       res.status(result.status).send(result);
       
    })

    //updating category

    router.post("/update-category",async function(req, res){

        var id = req.body.id; //id parameter
        var name = req.body.name; //name parameter 
        var active = req.body.active; //active parameter

        var result = await CategoryCtr.updateCategory(id, name, active);
 
        res.status(result.status).send(result);
        
     })


    module.exports=router;