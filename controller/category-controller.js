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

















//export functions
module.exports = {
    deleteCategory,
    updateCategory,
    displayCategory,





};