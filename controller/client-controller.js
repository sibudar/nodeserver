
const Models = require('../models/client-model');
const bcrypt = require('bcrypt');

const ClientModel = new Models();

class ClientController{

    async Login(email, password){




        var result = await ClientModel.Login(email, password);

        return result;
    }



}

module.exports = ClientController;