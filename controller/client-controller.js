
const ClientModels = require('../models/client-model');
const bcrypt = require('bcrypt');


    async function Login(email, password){
        var result = await ClientModels.Login(email, password);

        return result;
    }

    async function ActivateClient(id){
        var result = await ClientModels.ActivateClient(id)

        return result;

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
    

    // add more functions to export here
};