require('dotenv').config()
const util = require('util');
const mysql = require('mysql')

// const db = require('db')
// db.connect({
//   host: process.env.DB_HOST,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS
// })

  console.log(process.env.DB_NAME) 
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
 
});

connection.connect(function(error)
{
    if(!!error) 
    {
        console.log('Error', error);
    } else 
    {
        console.log('My sql connected');
    } 
});

//There is no promise for mysql, so we used util.promisify for only query to use async / await

//source: https://medium.com/@mhagemann/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4 
connection.query = util.promisify(connection.query).bind(connection);

module.exports = connection 