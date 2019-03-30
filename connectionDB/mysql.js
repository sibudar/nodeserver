require('dotenv').config()
const util = require('util');
const mysql = require('mysql')


console.log(process.env.DB_NAME)
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

handleDisconnect =  function(conn) {

    console.log('Connecting.....');

    conn.connect((err) => {
        if (err){

        }else{
            console.log('My sql connected');
        }
    }) ;

    conn.on('error', function(err) {
      if (!err.fatal) {
        return;
      }
  
      if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
        throw err;
      }
  
      console.log('Re-connecting lost connection: ' + err.stack);
  
      connection = mysql.createConnection(conn.config);
      handleDisconnect(connection);
      connection.connect();
    });
}
  
handleDisconnect(connection);
  

//There is no promise for mysql, so we used util.promisify for only query to use async / await

//source: https://medium.com/@mhagemann/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4 
connection.query = util.promisify(connection.query).bind(connection);

module.exports = connection 