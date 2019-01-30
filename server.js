const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const http = require('http');
const app = require('./app');
const server = http.createServer(app)



server.listen(3000 , () => {
    console.log('server running on 3000' ) 
})