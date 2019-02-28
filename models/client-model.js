
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
    async function ActivateClient(id){

        try{
        let sql = {
            sql: "CALL sp_activateClients(?)",
            timeout: 40000, // 40s
            values: [id]
           }
         // var sql = `CALL sp_activateClients(?)`;
          const sqlResult = await connection.query(sql);

          return sqlResult;
        }catch(err){
            return err;
            
          }  
    }
     //admin displaying all clients
    async function displayClient(){

try{
    let sql = {
     sql:"CALL sp_displayClients",
    }
        const sqlResult = await connection.query(sql);
        if (err) {
       //res.status(200).send("clients displayed") : res.status(403).send("can't display")
          res.json({'status' : 'Couldnt upload to db due to '});
      }else{
        return(result)   
      } 

    }catch(err){
        return err;
     }

    }
  //display single client
    async  function singleClient(id){
        try{
            connection.query("CALL sp_singleClient (?)", [id], function (err, result, fields){
                const sqlResult = await connection.query(sql);

                if (err) 
                res.send(err);
                //console.log(result);
            else

    
                return(result[0])
              })
            }catch(err){

            
        return err;
            }
             }
            

        

        


// add more functions to export here,
module.exports = {
    Login, 
    ActivateClient, displayClient, singleClient
};
    
