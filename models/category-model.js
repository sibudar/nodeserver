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
         
          return sqlResult;
    
    }catch(err){
    
        return err;
    
    }
    
    }

    //update category

async function updateCategory(id, name, active){
     
    try{
       
        const sql = {sql:"CALL sp_updateCategory(?,?,?)", values:[id,name, active]}
        const sqlResult = await connection.query(sql);
     
        return sqlResult;

    }catch(err){

        return err;
    }


    }

    //displaying category

    async function displayCategory() {

        try {
            let sql = { sql: "CALL sp_displayCategory" }
            const sqlResult = await connection.query(sql);
    
            return sqlResult
    
        } catch (err) {
            return err;
        }
    }

    //insert category

    async function addCategory(name, active){
   
        try{
    
          const sql = {sql: "CALL sp_addCategory(?,?)", values: [name, active]}
          const sqlResult = await connection.query(sql);
           
          return sqlResult;
           
        }catch(err){
          return err;
    
        }
    
    }
    

     
    


//export functions
module.exports = {
    deleteCategory,
    updateCategory,
    displayCategory,
    addCategory,

};