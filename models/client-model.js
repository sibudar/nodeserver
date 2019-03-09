const res = require("../helpers/http-response");
const mysql = require("mysql");
const connection = require("../connectionDB/mysql");
const bcrypt = require("bcrypt");

async function Login(email, password) {

    try {

        var sql = "SELECT * FROM clients WHERE email=" + mysql.escape(email);
        var sqlResult = await connection.query(sql);

        //check if result are not empty
        if (sqlResult.length > 0) {

            var match = await bcrypt.compare(password, sqlResult[0].password); //check if password matches
            var result = match ? res(200,"You are logged in",sqlResult) : res (401,"username or password is wrong");

            return result;
        } else {
            return res(404,"email doesn't exist")//wrong login details
        }
        //return sqlResult;

    } catch (err) {
        return err;
    }
}


/**
 * activating client
 * @param {required} id 
 */
async function ActivateClient(id) {

    try {
        let sql = {
            sql: "CALL sp_activateClients(?)",
            values: [id]
        }
        const sqlResult = await connection.query(sql);

        return res(200,"success",sqlResult);
    } catch (err) {
        return res(400,err);

    }
}


//admin displaying all clients
async function displayClient() {

    try {
        let sql = { sql: "CALL sp_displayClients" }
        const sqlResult = await connection.query(sql);

        return sqlResult

    } catch (err) {
        return err;
    }
}


//display single client
async function singleClient(id) {
    try {

        const sql = { sql: "CALL sp_singleClient(?)", values: [id] }
        const sqlResult = await connection.query(sql);

        return sqlResult;

    } catch (err) {
        return err;
    }
}

//deleting client
async function deleteClient(id) {

try{
       
    let sql = {
        sql: "CALL sp_DeleteClients(?)",
        values: [id]
       }
      const sqlResult = await connection.query(sql);
     
      return sqlResult;

}catch(err){

    return err;

}

}


//inserting clients
async function addClient(firstname, lastname, organization, password,email, active, adminID){
   
    try{

      const sql = {sql: "CALL sp_addClients(?,?,?,?,?,?,?)", values: [firstname, lastname, organization, password, email, active, adminID]}
      await connection.query(sql);
       

      
      return res(200,"client added");
       
    }catch(err){
      return res(400,err);

    }

}

//updating client
async function updateClient(id,firstname, lastname, organization, email){
     try{
         
        const sql = {sql:"CALL sp_updateClients(?,?,?,?,?)", values:[id,firstname, lastname, organization, email]}
        const sqlResult = await connection.query(sql);

    return sqlResult;

     }catch(err){
         return err;
 }

}

// add more functions to export here,
module.exports = {
    Login,
    ActivateClient,
    displayClient,
    singleClient,
    deleteClient,
    addClient,
    updateClient
};

