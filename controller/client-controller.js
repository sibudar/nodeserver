
const ClientModels = require('../models/client-model');
const bcrypt = require('bcrypt');


    async function Login(email, password){
        var result = await ClientModels.Login(email, password);

        return result;
    }


module.exports = {
    Login // add more functions to export here
};