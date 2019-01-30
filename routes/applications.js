const express = require('express');
const connection = require('../connectionDB/mysql');
const router = express.Router();
const app = express();

router.get('/', (req, res, next) =>{
    res.status(200).json({
        message :'Get all applications'
    })
  });

  router.get('/nonny', (req, res, next) =>{
    res.status(200).json({
        message :'added nonny'
    })
  });
module.exports=router;