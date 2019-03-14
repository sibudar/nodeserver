/*

client controller

All the logics and validations 
from client router are done here
*/

const ClientModels = require("../models/client-model");
const res = require("../helpers/http-response");
const {isEmail} = require("validator");
const send_mail = require("../helpers/emailer");
const check = require("check-types");


// const validate = function(data) {

//     if (!isNaN(data) && data != '' && data == undefined) {
//         return true;
//     } else {
//         return false;
//     }

// }



    async function Login(email, password){

        //chek if parameters are not empty
        if(email.trim().length ==0 || password.trim().length ==0){return res(404,"password and email is required")}
        if(!isEmail(email)){return res(400,"email not valid")};

        return await ClientModels.Login(email, password);
    }



    async function ActivateClient(id){
        if(check.not.integer(id)) {return res(406,"only integer allowed")};
        if(id.length ==0){return res(404,"id is required")};
        
        return await ClientModels.ActivateClient(id);
        //console.log(validator.isInt(id));

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

    if(check.not.integer(id)){return res(406, "only integer allowed")};
    if(id.length==0){return res(404, "id is required")};

    var result = await ClientModels.deleteClient(id)
    return result;

   }


   async function addClient(firstname, lastname, organization, password,email, active, adminID){

    //validation
        if(firstname.trim().length == 0){return res(404,"firstname is required")};
        if(lastname.trim().length == 0 ){return res(404,"surname is required")};
        if(organization.trim().length ==0 ){return res(404,"organization is required")};
        if(password.trim().length ==0 ){return res(404,"password is required")};
        if(email.trim().length ==0 ){return res(404,"email is required")};
        if(active.length ==0){return res(404,"active is required")};
        if(adminID.length ==0){return res(404,"adminID is required")};

        if(!isEmail(email)){return res(400,"email is not valid")};
        if(check.not.integer(active)){return res(400,"active must be an integer")};
        if(check.not.integer(adminID)){return res(400,"adminID must be an integer")};

       var result = await ClientModels.addClient(firstname, lastname, organization, password,email, active, adminID)

       //if client added successfully, send an email
       if(result.status == 200){
           //send mail
           var subject = "Congratulations";
           var message = "You have been added to xpo, please login here www.xpo.co.za/login"; //just an example

           send_mail(subject,email,message);
       }

       return result;

   }


   async function updateClient(id,firstname, lastname, organization, email){

        if(id.length==0){return res(404, "id is required")};
        if(firstname.trim().length == 0){return res(404,"firstname is required")};
        if(lastname.trim().length == 0 ){return res(404,"surname is required")};
        if(organization.trim().length ==0 ){return res(404,"organization is required")};
        if(email.trim().length ==0 ){return res(404,"email is required")};

        if(!isEmail(email)){return res(400,"email is not valid")};

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