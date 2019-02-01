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

//Get single application
router.get('/:id', (req, resp) => {


    connection.query("SELECT * FROM applications WHERE appID=?", [req.params.id], (error, rows, fields) => {
        if (error) {
            console.log('Error in the query');
            resp.send(error);
        } else {
            resp.json(rows);
        }

    })

});

//Delete application
router.delete('/:id', (req, resp) => {


    connection.query("DELETE FROM applications WHERE appID = ?", [req.params.id], (error, rows, fields) => {
        if (!error) {
            
            resp.send('Deleted');
        } else {
            console.log(error);
        }

    })

});

//Insert applications
router.post('/add', function (req, res) {

    appName = req.body.appName;
    appDesc = req.body.appDesc;
    active = req.body.active;
    appIcon = req.files.appIcon;
    dateCreated = req.body.dateCreated;
    iconName = appIcon.name;
    appIcon.mv('./public/icons/' + iconName, function (err) {
        console.log(err);
    });


    console.log(appName)
    connection.query("call sp_InsertApplications('" + appName + "','" + appDesc + "','" + active + "','" + iconName + "','" + dateCreated + "')", function (err) {

        if (err)
            res.send(err);
        else
            res.send({ status: "succesfull" });
    });

});





module.exports = router;