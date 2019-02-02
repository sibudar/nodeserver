# Installation 

Use [node pakage manager](https://nodejs.org/en/download/) to install all dependencies.

```bash
npm i
```

or

```bash
npm install
```

# Configaration

Import the database file name Xpo.sql found under the connectionDB folder to your mysql database server

Change the connection variable details according to your mysql confirguration.

```js
var connection = mysql.createConnection({
    host: 'yourhostname',
    user: 'yourusername',
    password: 'yourpassword',
    database: 'yourdatabase name',
   
});
```

# Usage

To start the server use the following command

```bash
node server.js
```