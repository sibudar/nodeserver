/*
   category controller

   validations from category router are done here
*/

const categoryModels = require ("../models/category-model");
const res = require ("../helpers/http-response");
const check = require("check-types");


async function deleteCategory(id){

    if(check.not.integer(id)){return res(406, "only integer allowed")};
    if(id.length==0){return res(404, "id is required")};

    var result = await categoryModels.deleteCategory(id)
    return result;

   }

async function updateCategory(id, name, active){
     
    if(id.length==0){return res(404, "id is required")};
    if(name.trim().length == 0){return res(404,"name is required")};
    if(active.length ==0){return res(404,"active is required")};

    if(check.not.integer(active)){return res(400,"active must be an integer")};
    if(check.not.integer(id)){return res(406, "only integer allowed")};
   
    var result = await categoryModels.updateCategory(id, name, active)
    return result;

}  

async function displayCategory(){

    var result = await categoryModels.displayCategory()
    return result;

}

async function addCategory(name, active){

    if(name.trim().length==0){return res(404,"name is required")};
    if(active.length==0){return res(404,"active is required")};

    if(check.not.integer(active)){return res(406,"active must be an integer")};

    var result = await categoryModels.addCategory(name, active)
    return result;

}


//export functions
module.exports = {
    deleteCategory,
    updateCategory,
    displayCategory,
    addCategory,


};