const util = require('util');
const mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'whm.thedigitalacademy.co.za',
    user: 'expo',
    password: 'nryyZ&R57C9W',
    database: 'expo_db',
   
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