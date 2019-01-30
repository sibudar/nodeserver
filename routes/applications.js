const express = require('express');
const connection = require('../connectionDB/mysql');
const router = express.Router();
const app = express();

// router.get('/', (req, res, next) => {
//     res.status(200).json({
//         message: 'Get all applications'
//     })
// });

router.get('/nonny', (req, res, next) => {
    res.status(200).json({
        message: 'added nonny'
    })
});

//Get all applications
router.get('/', function (req, resp) {

    console.log('Devon')
    connection.query("SELECT * FROM applications WHERE active =1", function (error, rows, fields) {
        if (error) {
            console.log('Error in the query');
        } else {
            resp.json(rows);
        }

    })

});

module.exports = router;