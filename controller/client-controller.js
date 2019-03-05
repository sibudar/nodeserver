/*

client controller

All the logics and validations 
from client router are done here
*/


const ClientModels = require('../models/client-model');
const bcrypt = require('bcrypt');



    async function Login(email, password){

        //chek if parameters are not empty
        if(email.length ==0 || password.length == 0){return "password and email is required"}
        return await ClientModels.Login(email, password);
    }

    async function ActivateClient(id){
        return await ClientModels.ActivateClient(id)

    }
    

   async function displayClient(){
       var result = await ClientModels.displayClient()

       return result;

   }


   async function singleClient(id){
       var result = await ClientModels.singleClient(id)
       return result;
   }

   async function deleteClient(id){
    var result = await ClientModels.deleteClient(id)
    return result;

   }


   async function addClient(firstname, lastname, organization, password,email, active, adminID){
       var result = await ClientModels.addClient(firstname, lastname, organization, password,email, active, adminID)
       return result;

   }

   async function updateClient(id,firstname, lastname, organization, email){
       var result = await ClientModels.updateClient(id,firstname, lastname, organization, email)
       return result;


   }

//export functions
module.exports = {
    Login ,
    ActivateClient,
    displayClient,
    singleClient,
    deleteClient,
    addClient,
    updateClient,
    

    
};