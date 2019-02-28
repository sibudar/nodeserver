
const mysql = require('mysql');
const connection = require('../connectionDB/mysql');
const bcrypt = require('bcrypt');


    async  function Login(email,password){

        try{

            var sql = "SELECT * FROM clients WHERE email="+mysql.escape(email);

            var sqlResult = await connection.query(sql);

                //if (err) return err
                //console.log(sqlResult.password);
                if(sqlResult.length>0){
                        
                
                    var match = await bcrypt.compare(password, sqlResult[0].password); //check if password matches
                    var result =  match ? "You are logged in" : "username or password is wrong";

                    return result;
                }else{
                    return("email doesn't exist")//wrong login details
                }
        

            //return sqlResult;
    
        }catch(err){
            return err;
        }

    }

    //Activate client
    async function ActivateClient(){
        //all activate client code in here
        

    }








// add more functions to export here,
module.exports = {
    Login, 
    ActivateClient
};

