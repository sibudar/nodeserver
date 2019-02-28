
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

module.exports = {
    Login ,
    ActivateClient, displayClient, singleClient

    // add more functions to export here
};