const res = require("../helpers/http-response")
const connection = require("../connectionDB/mysql");
const mysql = require("mysql");


//delete category
async function deleteCategory(id) {

    try{
           
        let sql = {
            sql: "CALL sp_deleteCategory(?)",
            values: [id]
           }
          const sqlResult = await connection.query(sql);
         
          return res(200, "successful", sqlResult);
    
    }catch(err){
    
        return res(400,err);
    
    }
    
    }

    //update category

async function updateCategory(id, name, active){
     
    try{
       
        const sql = {sql:"CALL sp_updateCategory(?,?,?)", values:[id,name, active]}
        const sqlResult = await connection.query(sql);
     
        return res(200, "successfully", sqlResult);

    }catch(err){

        return res(400,err);
    }


    }

    //displaying category

    async function displayCategory() {

        try {
            let sql = { sql: "CALL sp_displayCategory" }
            const sqlResult = await connection.query(sql);
    
            return res(200, "success",sqlResult);
    
        } catch (err) {
            return res(400,err);
        }
    }

    //insert category

    async function addCategory(name, active){
   
        try{
    
          const sql = {sql: "CALL sp_addCategory(?,?)", values: [name, active]}
          const sqlResult = await connection.query(sql);
           
          return res(200, "successful", sqlResult);
           
        }catch(err){
          return res(400,err);
    
        }
    
    }
    

     
    


//export functions
module.exports = {
    deleteCategory,
    updateCategory,
    displayCategory,
    addCategory,




};