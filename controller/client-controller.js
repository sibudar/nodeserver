/*

client controller

All the logics and validations 
from client router are done here
*/

const ClientModels = require("../models/client-model");
const bcrypt = require("bcrypt");
const res = require("../helpers/http-response");
const validator = require("validator");
const mailer = require('../helpers/emailer');



    async function Login(email, password){

        //chek if parameters are not empty
        if(email.length ==0 || password.length == 0){return res(404,"password and email is required")}
        if(!validator.isEmail(email)){return res(400,"email not valid")};

        return await ClientModels.Login(email, password);
    }



    async function ActivateClient(id){
        //if(!validator.isInt(id)) {return res(406,"only integer allowed")};
        //if(validator.isEmpty(id)){return res(204,"id is required")};
        
        return await ClientModels.ActivateClient(id);

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

    //validation
        // if(validator.isEmpty(firstname)){return res(204,"firstname is required")};
        // if(validator.isEmpty(lastname)){return res(204,"surname is required")};
        // if(validator.isEmpty(organization)){return res(204,"organization is required")};
        // if(validator.isEmpty(password)){return res(204,"password is required")};
        // if(validator.isEmpty(email)){return res(204,"email is required")};
        // if(validator.isEmpty(active)){return res(204,"active is required")};
        // if(validator.isEmpty(adminID)){return res(204,"adminID is required")};

        // if(!validator.isEmail(email)){return res(204,"email is not valid")};
        // if(!validator.isInt(active)){return res(204,"active must be an integer")};
        // if(!validator.isInt(adminID)){return res(204,"adminID must be an integer")};





       var result = await ClientModels.addClient(firstname, lastname, organization, password,email, active, adminID)


       //if client added successfully, send an email
       if(result.status == 200){
           //send mail
           var subject = "Congratulations";
           var message = "You have been added to xpo, please login here www.xpo.co.za/login"; //just an example

           //mail.send_mail(subject,email,message);
       }

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