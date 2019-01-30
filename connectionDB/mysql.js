var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'XpoDB',
   
});

connection.connect(function(error)
{
    if(!!error) 
    {
        console.log('Error');
    } else 
    {
        console.log('Connected');
    }
});
