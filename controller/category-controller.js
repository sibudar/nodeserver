/*
   category controller

   validations from category router are done here
*/

const categoryModels = require ('../models/category-model');


async function deleteCategory(id){
    var result = await categoryModels.deleteCategory(id)
    return result;

   }

async function updateCategory(id, name, active){
    var result = await categoryModels.updateCategory(id, name, active)
    return result;

}  

async function displayCategory(){
    var result = await categoryModels.displayCategory()
    return result;

}

async function addCategory(name, active){
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