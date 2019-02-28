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
connection.query = util.promisify(connection.query).bind(connection);

module.exports = connection 